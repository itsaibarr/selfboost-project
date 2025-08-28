const TodayProgressBar = () => {
    return (
        <div className="bg-[#0A0A0A] w-[628px] h-[127px] rounded-[10px] px-[40px] py-[30px] font-manrope">
            <div className="flex justify-between items-start mb-[20px]">
                <h2>Today's progress</h2>
                <div className="text-right">
                    <h4>60% Completed</h4>
                    <p>6/8 Goals</p>
                </div>
            </div>
            <div className="bg-[#fff] h-4 w-full rounded-[100px] overflow-hidden">
                <div className={"bg-[#8B5CF6] w-[60%] h-4 rounded-[100px]"}></div>
            </div>
        </div>
    )
}

export default TodayProgressBar