type Props = {
    completed: number;
    total: number;
};

const TodayProgressBar = ({ completed, total }: Props) => {
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="bg-[#0A0A0A] w-[628px] h-[127px] rounded-[10px] px-[40px] py-[30px] font-manrope mt-5">
            <div className="flex justify-between items-start mb-[20px]">
                <h2 className="text-white">Today's progress</h2>
                <div className="text-right">
                    <h4 className="text-white">{percent}% Completed</h4>
                    <p className="text-gray-400">{completed}/{total} Goals</p>
                </div>
            </div>
            <div className="bg-white h-4 w-full rounded-[100px] overflow-hidden">
                <div
                    className="bg-[#8B5CF6] h-4 rounded-[100px] transition-all duration-500 ease-out"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    );
};

export default TodayProgressBar