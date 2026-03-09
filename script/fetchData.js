

const all_issues = document.getElementById('all_issues')
const loding_spiner = document.getElementById('loding_spiner')
const issue_details_model = document.getElementById('issue_details_model')

const closed_btn = document.getElementById('closed_btn')
const open_btn = document.getElementById('open_btn')
const all_btn = document.getElementById('all_btn')

const open_issue = document.getElementById('open_issue')
const closed_issue = document.getElementById('closed_issue')
const issue_count = document.getElementById('issue_count')

let currentStatus = 'all'


const input_search = document.getElementById('input_search')
const btn_search = document.getElementById('btn_search')

//search fuctionality
document.getElementById('btn_search').addEventListener('click', async () => {
    const input = document.getElementById('input_search')
    const searchValue = input.value.trim().toLowerCase()
    console.log(searchValue)

    const res = await fetch(` https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)

    const data = await res.json()
    all_issues.innerHTML = ''

    displayIssue(data)
    console.log(data.data.length)
    issue_count.innerText = data.data.length
    input.value = ''
})
// open_issue.classList.add('hidden')
closed_issue.classList.add('hidden')

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
        closedIssue()
        closed_issue.classList.remove('hidden')
        fetchClose()
    } else if (id == 'open_btn') {
        console.log('open this')

        all_issues.classList.add('hidden')
        closed_issue.classList.add('hidden')
        openIssue()
        open_issue.classList.remove('hidden')
        fethcOpen()
    } else if (id == 'all_btn') {
        all_issues.classList.remove('hidden')
        open_issue.classList.add('hidden')
        closed_issue.classList.add('hidden')
        fetchAllIssue()
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
    displayIssue(data)
    closedIssue(data)
    // console.log(data.data.length)
    issue_count.innerText = data.data.length
    hideLoding()
}
fetchAllIssue()

const fethcOpen = async () => {
    showLoding()

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    const data = await res.json()
    displayIssue(data)
    openIssue(data)
    // closedIssue(data)

    hideLoding()
}

const fetchClose = async () => {
    showLoding()

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    const data = await res.json()
    displayIssue(data)
    closedIssue(data)
    closedIssue(data)
    hideLoding()
}


const displayIssue = (issues) => {
    issues?.data?.map((issue) => {
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
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    issue_details_model.innerHTML = ''
    const data = await res.json()
    const issueDetails = data.data
    // console.log(issueDetail)
    issue_details_model.showModal()

    displayModal(issueDetails)

}

const displayModal = async (issueDetails) => {
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



const openIssue = (issues) => {
    open_issue.innerHTML = '';

    issues?.data?.forEach((open) => {
        const openCount = issues?.data?.filter(issue => issue.status === 'open').length;
        // console.log(openCount);
        issue_count.innerText = openCount
        if (open.status === 'open') {

            const date = new Date(open.createdAt)
            const formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
            const formattedTime = + date.getHours() + ":" + date.getMinutes();
            const openDiv = document.createElement('div');

            openDiv.className = `bg-white p-4 shadow-lg rounded-lg cursor-pointer ${open.status == 'open' ? 'border-t-4 border-[#00A96E]' : 'border-t-4 border-purple-700'}`;

            openDiv.innerHTML = `
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="">
                        <div class="bg-[#FEECEC] text-red-500 w-20 h-6 text-center rounded-xl">
                            <p class="uppercase">${open.priority}</p>
                        </div>
                    </div>

                    <div onclick="openTreeModal(${open.id})" class="space-y-3">
                        <h1 class="font-semibold text-[14px] line-clamp-1">${open.title}</h1>
                        <p class="text-[#64748B] text-[12px] line-clamp-2">${open.description}</p>

                        <div class="flex gap-2 items-center">
                            <div class="flex bg-[#FEECEC] px-2 py-1 rounded-2xl gap-1 items-center border-2 border-[#FECACA]">
                                <img src="./assets/BugDroid.png" alt="">
                                <p class="text-[#EF4444] uppercase text-[8px]">${open.labels[0] ?? ''}</p>
                            </div>

                            <div class="flex bg-[#FFF8DB] px-2 py-1 rounded-2xl gap-1 items-center border-2 border-[#FDE68A]">
                                <img src="./assets/Lifebuoy.png" alt="">
                                <p class="text-[#D97706] uppercase text-[8px]">${open.labels[1] ?? ''}</p>
                            </div>
                        </div>
                    </div>

                    <hr class="text-[#E4E4E7]">

                    <div>
                        <p class="text-[#64748B] text-[12px]">${open.author}</p>
                        <p class="text-[#64748B] text-[12px]">Date: ${formattedDate}</p>
                        <p class="text-[#64748B] text-[12px]">Time: ${formattedTime}</p>
                    </div>
                </div>
            `;
            open_issue.append(openDiv);
        }
    });
};




const closedIssue = (closeIssues) => {
    closed_issue.innerHTML = '';

    closeIssues?.data?.forEach((close) => {

        const openCount = closeIssues?.data?.filter(issue => issue.status === 'closed').length;
        // console.log(openCount);
        issue_count.innerText = openCount

        if (close.status === 'closed') {
            const date = new Date(close.createdAt)
            const formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
            const formattedTime = + date.getHours() + ":" + date.getMinutes();
            const openDiv = document.createElement('div');
            const closeDiv = document.createElement('div');

            closeDiv.className = `bg-white p-4 shadow-lg rounded-lg cursor-pointer ${close.status == 'open' ? 'border-t-4 border-[#00A96E]' : 'border-t-4 border-purple-700'}`;

            closeDiv.innerHTML = `
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="">
                        <div class="bg-[#FEECEC] text-red-500 w-20 h-6 text-center rounded-xl">
                            <p class="uppercase">${close.priority}</p>
                        </div>
                    </div>

                    <div onclick="openTreeModal(${close.id})" class="space-y-3">
                        <h1 class="font-semibold text-[14px] line-clamp-1">${close.title}</h1>
                        <p class="text-[#64748B] text-[12px] line-clamp-2">${close.description}</p>

                        <div class="flex gap-2 items-center">
                            <div class="flex bg-[#FEECEC] px-2 py-1 rounded-2xl gap-1 items-center border-2 border-[#FECACA]">
                                <img src="./assets/BugDroid.png" alt="">
                                <p class="text-[#EF4444] uppercase text-[8px]">${close.labels[0] ?? ''}</p>
                            </div>

                            <div class="flex bg-[#FFF8DB] px-2 py-1 rounded-2xl gap-1 items-center border-2 border-[#FDE68A]">
                                <img src="./assets/Lifebuoy.png" alt="">
                                <p class="text-[#D97706] uppercase text-[8px]">${close.labels[1] ?? ''}</p>
                            </div>
                        </div>
                    </div>

                    <hr class="text-[#E4E4E7]">

                    <div>
                        <p class="text-[#64748B] text-[12px]">${close.author}</p>
                        <p class="text-[#64748B] text-[12px]">Date: ${formattedDate}</p>
                        <p class="text-[#64748B] text-[12px]">Time: ${formattedTime}</p>
                    </div>
                </div>
            `;

            closed_issue.append(closeDiv);
        }
    });
}

