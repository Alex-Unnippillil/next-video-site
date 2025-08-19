export interface SpekeRequest {
  protectionSystemIds: string[];
  resourceId: string;
}

export interface SpekeResponse {
  keys: Array<{ keyId: string; key: string }>;
  systemIds: string[];
}

/**
 * SPEKE 2.0 DRM key server adapter.
 *
 * This class wraps provider specific DRM key server logic
 * behind a common interface. All provider calls are placeholders
 * and should be replaced with production implementations.
 */
export class SpekeV2KeyServerAdapter {
  constructor(private provider: DrmProvider) {}

  /**
   * Retrieve keys for the given request.
   */
  async fetchKeys(req: SpekeRequest): Promise<SpekeResponse> {
    // Placeholder: delegate to provider's DRM key service
    // In production, this would make network calls to the DRM vendor
    const providerResponse = await this.provider.getKeys(req);

    return {
      keys: providerResponse.keys,
      systemIds: req.protectionSystemIds,
    };
  }
}

/**
 * Minimal interface for a DRM provider.
 * Replace with real provider SDK integration.
 */
export interface DrmProvider {
  getKeys(req: SpekeRequest): Promise<SpekeResponse>;
}

/**
 * Example placeholder provider returning static keys.
 */
export class PlaceholderDrmProvider implements DrmProvider {
  async getKeys(req: SpekeRequest): Promise<SpekeResponse> {
    return {
      keys: req.protectionSystemIds.map((id) => ({
        keyId: id,
        key: 'PLACEHOLDER_KEY',
      })),
      systemIds: req.protectionSystemIds,
    };
  }
}
