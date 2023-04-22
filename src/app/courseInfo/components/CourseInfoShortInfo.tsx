type Props = {
  shortInfo?: React.ReactNode;
};

const CourseInfoShortInfo = ({ shortInfo }: Props) => {
  return (
    <div className="bg-glass flex-initial rounded-xl p-2">{shortInfo}</div>
  );
};

export default CourseInfoShortInfo;
