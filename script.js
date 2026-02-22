const total_count_text = document.getElementById('total-txt');
const interview_count_text = document.getElementById('interview-txt');
const rejected_count_text = document.getElementById('rejected-txt');
let interview_arr = [];
let rejected_arr = [];
let currentStatus = 'all-filter-btn';
const allCards = document.getElementsByClassName('allcards');
const numofjobs = document.getElementById('numofjobs');
const all_filter_btn = document.getElementById('all-filter-btn')
const interview_filter_btn = document.getElementById('interview-filter-btn')
const Rejected_filter_btn = document.getElementById('Rejected-filter-btn')

const main = document.getElementsByTagName('main')[0];
const selected_card_section = document.getElementsByClassName('selected-cards')[0];

const noJob = document.getElementsByClassName('no-job')[0];

function toggle(id) {
    all_filter_btn.classList.remove('bg-[#3B82F6]', 'text-white');
    interview_filter_btn.classList.remove('bg-[#3B82F6]', 'text-white');
    Rejected_filter_btn.classList.remove('bg-[#3B82F6]', 'text-white');
    interview_filter_btn.classList.remove('stroke-[#F1F2F4]', 'bg-white', 'text-[#64748B]');
    Rejected_filter_btn.classList.remove('stroke-[#F1F2F4]', 'bg-white', 'text-[#64748B]');
    const selected = document.getElementById(id);
    selected.classList.add('bg-[#3B82F6]', 'text-white');
    currentStatus = id;
    if (id == 'all-filter-btn') {
        allCards[0].classList.remove('hidden');
        selected_card_section.classList.add('hidden');
        if (allCards[0].children.length > 0) {
            noJob.classList.add('hidden')
        }
    } else if (id == 'interview-filter-btn') {
        if (interview_arr.length == 0) {
            allCards[0].classList.add('hidden');
            selected_card_section.classList.add('hidden');
            noJob.classList.remove('hidden');

        } else {
            allCards[0].classList.add('hidden');
            selected_card_section.classList.remove('hidden');
            noJob.classList.add('hidden');

            renderInterview()
        }

    } else if (id == 'Rejected-filter-btn') {
        count_interviews()
        if (rejected_arr.length == 0) {
            allCards[0].classList.add('hidden');
            selected_card_section.classList.add('hidden');
            noJob.classList.remove('hidden');

        } else {
            allCards[0].classList.add('hidden');
            selected_card_section.classList.remove('hidden');
            noJob.classList.add('hidden');


            renderReject()
        }
    }

}
function count_interviews() {
    const total = allCards[0].children.length;
    const interviewCount = interview_arr.length;
    const rejectedCount = rejected_arr.length;
    total_count_text.innerText = total;
    interview_count_text.innerText = interviewCount;
    rejected_count_text.innerText = rejectedCount;

    numofjobs.textContent = `${total} jobs`


}
count_interviews();
main.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-card-btn')) {
        const parentnode = event.target.parentNode.parentNode
        const company = parentnode.querySelector('.company').innerText;
        const jobTitle = parentnode.querySelector('.jobTitle').innerText;
        const jobDescription = parentnode.querySelector('.jobDescription').innerText;
        const benefit = parentnode.querySelector('.benefit').innerText;
        const status = parentnode.querySelector('.status').innerText = 'Interview';
        updateAllCardStatus(status, company);

        const companyObj = {
            company,
            jobTitle,
            jobDescription,
            status,
            benefit
        }

        const isInInterviewArray = interview_arr.find(item => item.company == companyObj.company);

        if (!isInInterviewArray) {
            interview_arr.push(companyObj);
        }

        rejected_arr = rejected_arr.filter(item => item.company != companyObj.company);


        if (currentStatus == 'Rejected-filter-btn') {
            renderReject()
        }


        count_interviews()

    }


    if (event.target.classList.contains('reject-card-btn')) {
        const parentnode = event.target.parentNode.parentNode
        const company = parentnode.querySelector('.company').innerText;
        const jobTitle = parentnode.querySelector('.jobTitle').innerText;
        const jobDescription = parentnode.querySelector('.jobDescription').innerText;
        const benefit = parentnode.querySelector('.benefit').innerText;
        const status = parentnode.querySelector('.status').innerText = 'Reject';
        updateAllCardStatus(status, company);

        const companyObj = {
            company,
            jobTitle,
            jobDescription,
            status,
            benefit
        }

        const isInRejectArray = rejected_arr.find(item => item.company == companyObj.company);

        if (!isInRejectArray) {
            rejected_arr.push(companyObj);
        }
        interview_arr = interview_arr.filter(item => item.company != companyObj.company);
        if (currentStatus == 'interview-filter-btn') {
            renderInterview();
        }
        count_interviews()


    }

    if (event.target.classList.contains('dltbtn')) {
        let parent = event.target.parentNode.parentNode;
        const company = parent.querySelector('.company').innerText;

        del(company, currentStatus)
        count_interviews()
    }

})

function renderReject() {
    selected_card_section.innerHTML = ""
    if (rejected_arr.length === 0) {
        noJob.classList.remove('hidden')
    }
    for (let item of rejected_arr) {
        const div = document.createElement('div');

        div.innerHTML = `
             <div class="card my-4 p-6 bg-[#ffffffed] rounded-lg shadow-md">
                <div class="flex justify-between">
                   <div>
                     <p class="text-xl font-semibold company text-[##002C5C]">${item.company}</p>
                    <p class="text-[#64748B] text-lg pb-5 jobTitle">${item.jobTitle}</p>
                   </div>
                   <div class="cursor-pointer text-[#64748B] w-7 h-7 rounded-full border border-gray-300 text-center">
                     <i class="dltbtn fa-regular fa-trash-can"></i>
                   </div>
                </div>
                <div>
                    <p class="pb-5 text-[#64748B] jobDescription">${item.jobDescription}</p>
                </div>
                <div>
            <button class=" status rounded font-semibold  py-2 px-9 bg-[#EEF4FF] text-[##002C5C]">${item.status}</button>
                    <p class="pt-2 text-[#323B49] benefit text-[14px]">${item.benefit}</p>
                </div>
                <div class="pt-5">
            <button class="interview-card-btn mr-2 cursor-pointer rounded font-bold  py-2 md:px-9 px-5 border border-green-500 text-green-500">Interview</button>
            <button class="reject-card-btn cursor-pointer rounded font-bold  py-2 md:px-9 px-5 border border-red-500 text-red-500">Rejected</button>

                </div>
            </div>
        `
        selected_card_section.appendChild(div);
    }
}

function renderInterview() {
    selected_card_section.innerHTML = "";
    if (interview_arr.length === 0) {
        noJob.classList.remove('hidden')
    }
    for (let item of interview_arr) {
        const div = document.createElement('div');
        div.innerHTML = `
                 <div class="card my-4 p-6 bg-[#ffffffed] rounded-lg shadow-md">
                <div class="flex justify-between">
                   <div>
                     <p class="text-xl font-semibold company text-[##002C5C]">${item.company}</p>
                    <p class="text-[#64748B] text-lg pb-5 jobTitle">${item.jobTitle}</p>
                   </div>
                   <div class="cursor-pointer text-[#64748B] w-7 h-7 rounded-full border border-gray-300 text-center">
                     <i class="dltbtn fa-regular fa-trash-can"></i>
                   </div>
                </div>
                <div>
                    <p class="pb-5 text-[#64748B] jobDescription">${item.jobDescription}</p>
                </div>
                <div>
            <button class=" status rounded font-semibold  py-2 px-9 bg-[#EEF4FF] text-[##002C5C]">${item.status}</button>
                    <p class="pt-2 text-[#323B49] benefit text-[14px]">${item.benefit}</p>
                </div>
                <div class="pt-5">
            <button class="interview-card-btn mr-2 cursor-pointer rounded font-bold  py-2 md:px-9 px-5 border border-green-500 text-green-500">Interview</button>
            <button class="reject-card-btn cursor-pointer rounded font-bold  py-2 md:px-9 px-5 border border-red-500 text-red-500">Rejected</button>

                </div>
            </div>
        `

        selected_card_section.appendChild(div)
    }
}

function updateAllCardStatus(status, company) {
    const allCards = document.querySelectorAll('.allcards .card');
    allCards.forEach(item => {
        const companyName = item.querySelector('.company').innerText;

        if (companyName == company) {
            item.querySelector('.status').innerText = status;
        }
    })
}

function del(company, status) {
    const allCards = document.querySelectorAll('.allcards .card');

    allCards.forEach(item => {
        const companyName = item.querySelector('.company').innerText;
        if (company == companyName) {
            item.remove();
        }
    })
    if(allCards.length==1){
        noJob.classList.remove('hidden')
    }
    if (status == 'interview-filter-btn') {
        interview_arr = interview_arr.filter(item => item.company != company);
        renderInterview();
    } else if (status == 'Rejected-filter-btn') {
        rejected_arr = rejected_arr.filter(item => item.company != company);
        renderReject()
    }
}

