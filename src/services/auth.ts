
export const GetLoginCredentials = async (data: any) => {
  try {
    const response = await fetch(
      `https://bs3178k0-7103.inc1.devtunnels.ms/api/Login/generate-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "TenantId": data.tenantId,
        },
        body: JSON.stringify({
          userId: data.userId,
          password: data.password,
        }),
        // credentials: "include",
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // log raw error
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in GetLoginCredentials:", error);
    throw error;
  }
};


