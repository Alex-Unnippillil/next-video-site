# PowerShell script to process all open PRs using the accept-pr script
$ErrorActionPreference = "Stop"

Write-Host "Checking for GitHub CLI and Codex availability..."

# Check if GitHub CLI is available
try {
    gh auth status 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Error "GitHub CLI authentication failed. Please run 'gh auth login' first."
        exit 1
    }
    Write-Host "✓ GitHub CLI is authenticated"
} catch {
    Write-Error "GitHub CLI (gh) is not installed. Please install it from https://cli.github.com/"
    exit 1
}

# Check if Codex is available
try {
    codex --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Codex CLI is not available. Will skip automated reviews."
        $useCodex = $false
    } else {
        Write-Host "✓ Codex CLI is available"
        $useCodex = $true
    }
} catch {
    Write-Warning "Codex CLI is not installed. Will skip automated reviews."
    $useCodex = $false
}

# Get list of open PRs
Write-Host "Fetching open pull requests..."
try {
    $openPRs = gh pr list --state open --json number,title,author,url | ConvertFrom-Json
    
    if ($openPRs.Count -eq 0) {
        Write-Host "No open pull requests found."
        exit 0
    }
    
    Write-Host "Found $($openPRs.Count) open pull request(s):"
    foreach ($pr in $openPRs) {
        Write-Host "  PR #$($pr.number): $($pr.title) by $($pr.author.login)"
    }
    
} catch {
    Write-Error "Failed to fetch open PRs: $_"
    exit 1
}

# Process each PR
Write-Host "`nProcessing pull requests..."

foreach ($pr in $openPRs) {
    Write-Host "`n" + "="*60
    Write-Host "Processing PR #$($pr.number): $($pr.title)"
    Write-Host "Author: $($pr.author.login)"
    Write-Host "URL: $($pr.url)"
    Write-Host "="*60
    
    if ($useCodex) {
        try {
            # Use the accept-pr script for automated review
            & "$PSScriptRoot\accept-pr.ps1" -PR $pr.number
        } catch {
            Write-Error "Failed to process PR #$($pr.number): $_"
            Write-Host "Continuing with next PR..."
        }
    } else {
        # Manual review mode - just display PR info
        Write-Host "Codex not available. Manual review required for PR #$($pr.number)"
        
        # Show PR diff summary
        try {
            Write-Host "`nPR Diff Summary:"
            gh pr diff $pr.number --name-only
            
            # Ask user for action
            $action = Read-Host "`nAction for PR #$($pr.number) (approve/reject/skip)"
            
            switch ($action.ToLower()) {
                "approve" {
                    $comment = Read-Host "Approval comment (optional)"
                    if ([string]::IsNullOrWhiteSpace($comment)) {
                        gh pr review $pr.number --approve
                    } else {
                        gh pr review $pr.number --approve -b $comment
                    }
                    
                    $shouldMerge = Read-Host "Merge now? (y/n)"
                    if ($shouldMerge.ToLower() -eq "y") {
                        gh pr merge $pr.number --squash --delete-branch
                        Write-Host "PR #$($pr.number) merged successfully!"
                    }
                }
                "reject" {
                    $comment = Read-Host "Rejection comment (required)"
                    gh pr review $pr.number --request-changes -b $comment
                    Write-Host "Changes requested for PR #$($pr.number)"
                }
                "skip" {
                    Write-Host "Skipped PR #$($pr.number)"
                }
                default {
                    Write-Host "Invalid action. Skipping PR #$($pr.number)"
                }
            }
        } catch {
            Write-Error "Error processing PR #$($pr.number): $_"
        }
    }
}

Write-Host "`n" + "="*60
Write-Host "Finished processing all open pull requests!"
Write-Host "="*60
