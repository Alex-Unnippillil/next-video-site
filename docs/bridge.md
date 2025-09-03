# Wyze Login API Change Recovery Guide

When Wyze modifies its login APIs, existing authentication flows in the bridge may fail, preventing the system from retrieving camera streams. Follow these steps to recover:

1. **Review the Announcement**  
   Wyze typically announces breaking changes ahead of time. See the discussion in [docker-wyze-bridge issue #1163](https://github.com/mrlt8/docker-wyze-bridge/issues/1163) for context and ongoing updates.

2. **Switch to the Developer API**  
   Wyze's v2 and v3 login endpoints are deprecated. Migrate credentials to the supported Developer API and update environment variables or configuration files to use the new endpoints.

3. **Refresh Credentials**  
   Generate new API keys from Wyze, update any stored secrets, and restart the bridge to pick up the changes. Clearing cached authentication tokens may be necessary.

4. **Rebuild and Redeploy**  
   Pull the latest bridge container or source code, rebuild the image, and redeploy to ensure all patches for the new API are applied.

5. **Monitor Logs**  
   After deployment, monitor the bridge logs for successful login and streaming initialization. Address any warnings or errors immediately.

If issues persist after following these steps, consult the upstream issue above or open a new one with logs and configuration details.
