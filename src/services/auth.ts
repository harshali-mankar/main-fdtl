import { getAppConfig } from "../../configLoader";

export const GetLoginCredentials = async (data: any) => {
  try {
    const { REACT_APP_AUTH_URL, DEFAULT_HEADERS } = getAppConfig();

    const response = await fetch(`${REACT_APP_AUTH_URL}/Login/generate-token`, {
      method: "POST",
      headers: {
        ...DEFAULT_HEADERS,        
        TenantId: data.tenantId,   
      },
      body: JSON.stringify({
        userId: data.userId,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in GetLoginCredentials:", error);
    throw error;
  }
};
