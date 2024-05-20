import { useAppSelector } from "../../../redux/hooks";

export default function AccountSettings() {
  const { currentUser } = useAppSelector((state) => state.user);
  return <div>AccountSettings : {currentUser?.hoTen}</div>;
}
