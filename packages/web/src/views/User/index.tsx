import { useUserStore } from "@/store";

export const User = () => {
  const { user } = useUserStore();
  return <div>{JSON.stringify(user)}</div>;
};