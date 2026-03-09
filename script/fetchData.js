

const all_issues = document.getElementById('all_issues')
const loding_spiner = document.getElementById('loding_spiner')
const issue_details_model = document.getElementById('issue_details_model')

const closed_btn = document.getElementById('closed_btn')
const open_btn = document.getElementById('open_btn')
const all_btn = document.getElementById('all_btn')

const open_issue = document.getElementById('open_issue')
const closed_issue = document.getElementById('closed_issue')

let currentStatus = 'all'

const toggleBtn = (id) => {
    all_btn.classList.add('bg-[#4A00FF]', 'text-white')
    open_btn.classList.add('bg-[#4A00FF]', 'text-white')
    closed_btn.classList.add('bg-[#4A00FF]', 'text-white')

    all_btn.classList.remove('bg-[#4A00FF]', 'text-white')
    open_btn.classList.remove('bg-[#4A00FF]', 'text-white')
    closed_btn.classList.remove('bg-[#4A00FF]', 'text-white')

    const selectBtn = document.getElementById(id)
    selectBtn.classList.add('bg-[#4A00FF]', 'text-white')
    console.log(selectBtn)

    currentStatus = id
    console.log(currentStatus)

    if (id == 'closed_btn') {
        console.log('this is close')
        all_issues.classList.add('hidden')
        open_issue.classList.add('hidden')
        closed_issue.classList.remove('hidden')
    } else if (id == 'open_btn') {
        console.log('open this')
        openIssue()
        all_issues.classList.add('hidden')
        closed_issue.classList.add('hidden')
        open_issue.classList.remove('hidden')
    } else if (id == 'all_btn') {
        all_issues.classList.remove('hidden')
        open_issue.classList.add('hidden')
        closed_issue.classList.add('hidden')
    }
}



const showLoding = () => {
    loding_spiner.classList.remove('hidden')
    loding_spiner.classList.add('flex')
    all_issues.innerHTML = ''
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
    openIssue(data)
    closedIssue(data)

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
        Card.className = `bg-white p-4 shadow-lg rounded-lg cursor-pointer ${status == 'open' ? 'border-t-4 border-[#00A96E]' : 'border-t-4 border-purple-700'}`;
        Card.innerHTML = `
                        <div class=" space-y-3 ">
                            <div class="flex justify-between items-center">
                                <img src="./assets/Open-Status.png" alt="">
                                <div class="bg-[#FEECEC] text-red-500 w-20 h-6 text-center rounded-xl">
                                    <p class=" uppercase">${priority}</p>
                                </div>
                            </div>
                            <div onclick="openTreeModal(${id})" class=" space-y-3">
                                <h1  class="font-semibold text-[14px] line-clamp-1">${title}</h1>
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

const openTreeModal = async (issueId) => {
    console.log(issueId)
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    issue_details_model.innerHTML = ''
    const data = await res.json()
    console.log(data)
    const issueDetails = data.data
    // console.log(issueDetail)
    issue_details_model.showModal()

    displayModal(issueDetails)

}

const displayModal = async (issueDetails) => {
    console.log(issueDetails.id)
    const details = document.createElement('div')
    const { id, title, description, status, labels, priority, author, assignee, createdAt, updatedAt } = issueDetails
    const date = new Date(createdAt)
    const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    const formattedTime = + date.getHours() + ":" + date.getMinutes();
    console.log(title)
    details.innerHTML = `
      <div class="modal-box">
                            <div>
                                <div class=" space-y-4 flex flex-col justify-center">
                                    <h1 class="font-bold text-2xl">${title}</h1>
                                    <div class=" text-[12px] flex gap-2 items-center ">
                                        <button
                                            class="bg-[#00A96E] py-1 px-2 text-white text-center rounded-xl capitalize">${status}</button>
                                        <p class="text-[#64748B] text-[12px]">Opened by ${assignee ? assignee : 'shakil'}</p>
                                        <p class="text-[#64748B] text-[12px]">${formattedDate}</p>
                                    </div>
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
                                    <p class=" text-[#64748B] text-base">${description}</p>
                                    <div class=" grid grid-cols-2">
                                        <div>
                                            <p class=" text-[#64748B] text-base">Assignee</p>
                                            <p class="text-[#1F2937] text-base font-semibold">${assignee ? assignee : 'shakil'}</p>
                                        </div>
                                        <div>
                                            <p class=" text-[#64748B] text-base">Priority:</p>
                                            <button
                                                class="bg-red-500 text-white w-20 h-6 text-center rounded-xl uppercase text-[8px]">
                                                ${priority}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-action">
                                <form method="dialog">
                                    <!-- if there is a button in form, it will close the modal -->
                                    <button class="btn">Close</button>
                                </form>
                            </div>
                        </div>
    `
    issue_details_model.append(details)

}


const openIssue = (openIssue) => {
    const div = document.createElement('div')
    open_issue.innerHTML = ''
    div.innerHTML = 'open'

    // console.log(openIssue.data)
    openIssue?.data?.map((open) => {
        // console.log(open.status == 'open')
        if (open.status === 'open') {
            div.innerHTML = `${open.title}`
        }
    })

    open_issue.append(div)
}
const closedIssue = () => {
    const div = document.createElement('div')
    open_issue.innerHTML = ''
    div.innerHTML = 'close'
    // open_issue.append(div)
}