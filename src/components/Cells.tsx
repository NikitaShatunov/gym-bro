import { useAppSelector } from "../redux/redux";

interface CellsProps {
  name: string;
  src: string;
  onClick?: () => void;
}
export const Cells = ({ name, src, onClick }: CellsProps) => {
  const doneGroup = useAppSelector((state) => state.exercise.doneGroup);
  const muscleGroup = useAppSelector((state) => state.exercise.muscleGroup);
  return (
    <>
       {muscleGroup.includes(name) ? (
      doneGroup.includes(name) ? (
        <div className="items__cells" onClick={onClick}>
          <div>{name}</div>
          <img src={src} alt={name} />
          <img className="items__cells__mark" src="/img/check.svg" alt="check" />
        </div>
      ) : (
        <div className="items__cells items__cells__selected " onClick={onClick}>
          <div>{name}</div>
          <img src={src} alt={name} />
        </div>
      )
    )  : (
        <div className="items__cells " onClick={onClick}>
          <div>{name}</div>
          <img src={src} alt={name} />
        </div>
      )
    }
    </>
  );
};
