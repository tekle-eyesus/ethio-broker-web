import api from "./api";

export const getDashboardStats = async () => {
  try {
    const [clientsRes, policiesRes, claimsRes, expiringRes] = await Promise.all(
      [
        api.get("/clients?limit=1"),
        api.get("/policies?status=Active&limit=1"),
        api.get("/claims?status=Reported&limit=1"),
        api.get("/policies?expiringSoon=true&limit=5"),
      ]
    );

    return {
      totalClients: clientsRes.data.data.total || 0,
      activePolicies: policiesRes.data.data.total || 0,
      pendingClaims: claimsRes.data.data.total || 0,
      expiringPolicies: expiringRes.data.data.policies || [],
    };
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return {
      totalClients: 0,
      activePolicies: 0,
      pendingClaims: 0,
      expiringPolicies: [],
    };
  }
};
