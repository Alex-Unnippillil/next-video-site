# PowerShell version of the PR review script
param(
    [Parameter(Mandatory=$true)]
    [string]$PR
)

# Set error action preference to stop on errors
$ErrorActionPreference = "Stop"

Write-Host "Processing PR: $PR"

# Check if GitHub CLI is available
try {
    gh auth status 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Error "GitHub CLI authentication failed. Please run 'gh auth login' first."
        exit 1
    }
} catch {
    Write-Error "GitHub CLI (gh) is not installed. Please install it from https://cli.github.com/"
    exit 1
}

# Check if Codex is available
try {
    codex --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Codex CLI is not available. Please install it first."
        exit 1
    }
} catch {
    Write-Error "Codex CLI is not installed or not in PATH."
    exit 1
}

# Create temporary file for diff
$diffFile = [System.IO.Path]::GetTempFileName()

try {
    # Capture PR diff
    Write-Host "Capturing diff for PR $PR..."
    gh pr diff $PR | Out-File -FilePath $diffFile -Encoding UTF8
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to get PR diff. Please check the PR number/URL."
        exit 1
    }
    
    # Run Codex review
    Write-Host "Running Codex review..."
    $reviewPrompt = "You are the PR Review Gate. Read the unified diff in $diffFile and apply the rules in AGENTS.md. Output numbered blockers. End with APPROVE or REJECT only."
    
    $review = codex --ask-for-approval never --sandbox read-only $reviewPrompt
    $review | Out-File -FilePath ".codex_pr_review.txt" -Encoding UTF8
    
    Write-Host "Codex Review Results:"
    Write-Host $review
    
    # Check the last line for approval
    $lastLine = ($review -split "`n")[-1].Trim()
    
    if ($lastLine -eq "APPROVE") {
        Write-Host "PR APPROVED by Codex. Proceeding with merge..."
        
        # Approve the PR
        gh pr review $PR --approve -b "Approved by Codex review. See .codex_pr_review.txt"
        
        # Merge the PR
        gh pr merge $PR --squash --delete-branch --auto
        
        Write-Host "PR $PR has been approved and merged successfully!"
    } else {
        Write-Host "PR REJECTED by Codex. Requesting changes..."
        
        # Request changes
        gh pr review $PR --request-changes -F ".codex_pr_review.txt"
        
        Write-Host "Requested changes for PR $PR. Review file: .codex_pr_review.txt"
    }
    
} catch {
    Write-Error "An error occurred: $_"
    exit 1
} finally {
    # Clean up temporary file
    if (Test-Path $diffFile) {
        Remove-Item $diffFile -Force
    }
}
