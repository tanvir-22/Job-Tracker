const total_count_text = document.getElementById('total-txt');
const interview_count_text = document.getElementById('interview-txt');
const rejected_count_text = document.getElementById('rejected-txt');
let interview_arr = [];
let rejected_arr = [];

const allCards = document.getElementsByClassName('allcards');

const all_filter_btn = document.getElementById('all-filter-btn')
const interview_filter_btn = document.getElementById('interview-filter-btn')
const Rejected_filter_btn = document.getElementById('Rejected-filter-btn')

const main = document.getElementsByTagName('main')[0];
const selected_card_section = document.getElementsByClassName('selected-cards')[0];

const noJob = document.getElementsByClassName('no-job')[0];


function count_interviews(){
    total_count_text.innerText = allCards[0].children.length; 
    interview_count_text.innerText = interview_arr.length; 
    rejected_count_text.innerText = rejected_arr.length; 
}
count_interviews();

function toggle(id){
    all_filter_btn.classList.remove('bg-[#3B82F6]', 'text-white');
    interview_filter_btn.classList.remove('bg-[#3B82F6]', 'text-white');
    Rejected_filter_btn.classList.remove('bg-[#3B82F6]', 'text-white');
    interview_filter_btn.classList.remove('stroke-[#F1F2F4]','bg-white', 'text-[#64748B]');
    Rejected_filter_btn.classList.remove('stroke-[#F1F2F4]','bg-white', 'text-[#64748B]');
    const selected = document.getElementById(id);
    selected.classList.add('bg-[#3B82F6]', 'text-white');

    if(id=='all-filter-btn'){
        allCards[0].classList.remove('hidden');
        selected_card_section.classList.add('hidden');
    }else if(id=='interview-filter-btn'){
        if(interview_arr.length==0){
            allCards[0].classList.add('hidden');
            noJob.classList.remove('hidden');
        }else{
            allCards[0].classList.add('hidden');
            selected_card_section.classList.remove('hidden');
            //render
        }

    }else if(id=='Rejected-filter-btn'){
        if(rejected_arr.length==0){
            allCards[0].classList.add('hidden');
            noJob.classList.remove('hidden');
        }else{
            allCards.classList.add('hidden');
            selected_card_section.classList.remove('hidden');
            //render
        }
    }

}

main.addEventListener('click',function(event){
        if(event.target.classList.contains('interview-card-btn')){
               const parentnode =  event.target.parentNode.parentNode
            const company =    parentnode.querySelector('.company').innerText;
            const jobTitle =    parentnode.querySelector('.jobTitle').innerText;
            const jobDescription =    parentnode.querySelector('.jobDescription').innerText;
            const benefit =    parentnode.querySelector('.benefit').innerText;
            parentnode.querySelector('.status').innerText = 'Interview';


            const companyObj = {
                company,
                jobTitle,
                jobDescription,
                status:'Interview',
                benefit
            }

            const isInInterviewArray  = interview_arr.find(item=>item.company==companyObj.company);

            if(!isInInterviewArray){
                interview_arr.push(companyObj);
            }

            rejected_arr = rejected_arr.filter(item=>item.company!=companyObj.company);
            console.log(interview_arr);
            console.log(rejected_arr);
            
            count_interviews()

        }


        if(event.target.classList.contains('reject-card-btn')){
               const parentnode =  event.target.parentNode.parentNode
            const company =    parentnode.querySelector('.company').innerText;
            const jobTitle =    parentnode.querySelector('.jobTitle').innerText;
            const jobDescription =    parentnode.querySelector('.jobDescription').innerText;
            const benefit =    parentnode.querySelector('.benefit').innerText;
            parentnode.querySelector('.status').innerText = 'Reject';


            const companyObj = {
                company,
                jobTitle,
                jobDescription,
                status:'Reject',
                benefit
            }

            const isInRejectArray  = rejected_arr.find(item=>item.company==companyObj.company);

            if(!isInRejectArray){
                rejected_arr.push(companyObj);
            }
              interview_arr = interview_arr.filter(item=>item.company!=companyObj.company);
           
            count_interviews()

        }


})

//add render functionality and delete btn functionality and $ available job section change