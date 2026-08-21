import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

export const useActuatorQuery = () => {
  const queryClient = useQueryClient();

  const actuatorQuery = useQuery({
    queryKey: ["actuators-state"],
    queryFn: async () => {
      const res = await $fetch<{ data: any[] }>(
        "http://localhost:8080/api/v1/actuators",
      );
      return res.data || [];
    },
    refetchInterval: 3000,
  });

  const toggleMutation = useMutation({
    mutationFn: async (payload: { device: string; status: string }) => {
      return await $fetch("http://localhost:8080/api/v1/actuators/toggle", {
        method: "POST",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actuators-state"] });
    },
  });

  return { actuatorQuery, toggleMutation };
};
