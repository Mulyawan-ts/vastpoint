import { useQuery } from "@tanstack/vue-query";

export const useHealthQuery = () => {
  const goHealthQuery = useQuery({
    queryKey: ["health-go"],
    queryFn: async () => {
      try {
        const res = await $fetch<{ status: string }>(
          "http://localhost:8080/health",
        );
        return res.status === "ok";
      } catch {
        return false;
      }
    },
    refetchInterval: 10000,
  });

  const pythonHealthQuery = useQuery({
    queryKey: ["health-python"],
    queryFn: async () => {
      try {
        const res = await $fetch<{ status: string }>(
          "http://localhost:8000/health",
        );
        return res.status === "ok";
      } catch {
        return false;
      }
    },
    refetchInterval: 10000,
  });

  return { goHealthQuery, pythonHealthQuery };
};
