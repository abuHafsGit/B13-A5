
const all_issues = document.getElementById('all_issues')
const loding_spiner = document.getElementById('loding_spiner')
const closed_btn = document.getElementById('closed_btn')
const open_btn = document.getElementById('open_btn')
const all_btn = document.getElementById('all_btn')


const showLoding = () => {
    loding_spiner.classList.remove('hidden')
    loding_spiner.classList.add('flex')
}

const hideLoding = () => {
    loding_spiner.classList.add('hidden')
}

const fetchAllIssue = async () => {
    showLoding()

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    const data = await res.json()
    // console.log(data)
    displayIssue(data)

    hideLoding()
}
fetchAllIssue()



const displayIssue = (issues) => {
    // console.log(issues)
    issues?.data?.map((issue) => {
        // console.log(issue)
        const { id, title, description, status, labels, priority, author, assignee, createdAt, updatedAt } = issue
        const date = new Date(createdAt)
        const formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        const formattedTime = + date.getHours() + ":" + date.getMinutes();

        const Card = document.createElement('div');
        Card.className = "bg-white p-4 shadow-lg rounded-lg cursor-pointer";
        Card.innerHTML = `
                        <div class=" space-y-3">
                            <div class="flex justify-between items-center">
                                <img src="./assets/Open-Status.png" alt="">
                                <div class="bg-[#FEECEC] text-red-500 w-20 h-6 text-center rounded-xl">
                                    <p class=" uppercase">${priority}</p>
                                </div>
                            </div>
                            <div class=" space-y-3">
                                <h1 class="font-semibold text-[14px] line-clamp-1">${title}</h1>
                                <p class=" text-[#64748B] text-[12px] line-clamp-2">${description}</p>
                                <div class="flex gap-2 items-center">
                                    <div
                                        class=" flex bg-[#FEECEC] px-2 py-1 rounded-2xl gap-1 justify-center items-center border-2 border-[#FECACA]">
                                        <div><img src="./assets/BugDroid.png" alt=""></div>
                                        <p class="text-[#EF4444] bg-[#] uppercase text-[8px]">${labels[0]}</p>
                                    </div>
                                    <div
                                        class=" flex bg-[#FFF8DB] px-2 py-1 rounded-2xl gap-1 justify-center items-center border-2 border-[#FDE68A]">
                                        <div><img src="./assets/Lifebuoy.png" alt=""></div>
                                        <p class="text-[#D97706] bg-[#] uppercase text-[8px]">${labels[1]}</p>
                                    </div>
                                </div>
                            </div>
                            <hr class="text-[#E4E4E7]">
                            <div>
                                <p class="text-[#64748B] text-[12px]">${author}</p>
                                <p class="text-[#64748B] text-[12px]">Date: ${formattedDate}</p>
                                <p class="text-[#64748B] text-[12px]">Time: ${formattedTime}</p>
                            </div>
                        </div>
        `
        all_issues.append(Card)
    })
}



const fetchSingleIssue = async () => {
    showLoding()

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    const data = await res.json()
    // console.log(data)
    displayIssue(data)

    hideLoding()
}
const fetchSearchIssue = async () => {
    showLoding()

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    const data = await res.json()
    // console.log(data)
    displayIssue(data)

    hideLoding()
}