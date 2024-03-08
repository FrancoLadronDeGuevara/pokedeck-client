import { useDispatch } from "react-redux";
import ChestStore from "../components/chestStore/ChestStore";
import { useEffect } from "react";
import { getAllChests } from "../redux/actions/chestActions";

const StorePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChests());
  }, []);

  return (
    <>
      <ChestStore />
    </>
  );
};

export default StorePage;
