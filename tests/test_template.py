import yaml
from pathlib import Path

class CfnLoader(yaml.SafeLoader):
    pass

def _construct_ref(loader, node):
    return {'Ref': loader.construct_scalar(node)}

def _construct_getatt(loader, node):
    return {'Fn::GetAtt': loader.construct_scalar(node)}

def _construct_sub(loader, node):
    return {'Fn::Sub': loader.construct_scalar(node)}

CfnLoader.add_constructor('!Ref', _construct_ref)
CfnLoader.add_constructor('!GetAtt', _construct_getatt)
CfnLoader.add_constructor('!Sub', _construct_sub)

def load_template():
    template_path = Path(__file__).resolve().parent.parent / "api_gateway_waf.yaml"
    with open(template_path) as f:
        return yaml.load(f, Loader=CfnLoader)

def test_usage_plan_and_api_key_present():
    tpl = load_template()
    resources = tpl["Resources"]
    assert "UsagePlan" in resources
    assert resources["UsagePlan"]["Type"] == "AWS::ApiGateway::UsagePlan"
    assert "ServerApiKey" in resources
    assert resources["ServerApiKey"]["Type"] == "AWS::ApiGateway::ApiKey"
    assert "UsagePlanKey" in resources

def test_waf_has_managed_and_rate_limit_rules():
    tpl = load_template()
    rules = tpl["Resources"]["WebACL"]["Properties"]["Rules"]
    names = {r["Name"] for r in rules}
    assert "AWSManagedRulesCommonRuleSet" in names
    assert "RateLimit" in names
    managed = next(r for r in rules if r["Name"] == "AWSManagedRulesCommonRuleSet")
    assert managed["Statement"]["ManagedRuleGroupStatement"]["Name"] == "AWSManagedRulesCommonRuleSet"
    rate_rule = next(r for r in rules if r["Name"] == "RateLimit")
    assert rate_rule["Statement"]["RateBasedStatement"]["Limit"] == 1000
