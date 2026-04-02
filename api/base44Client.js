// api/base44Client.js

export const base44 = {
    async post(endpoint, data) {
      console.warn(
        '[base44Client] Stubbed request:',
        endpoint,
        data
      );
  
      // Fake successful response
      return {
        success: true,
        data: null,
      };
    },
  };
  