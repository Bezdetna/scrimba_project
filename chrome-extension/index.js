let myLeads = [];

const ulEl = document.querySelector("#ul-el")
const tabBtn = document.querySelector("#tab-btn");
const inputEl = document.querySelector("#input-el");
const deleteBtn = document.querySelector("#delete-btn");
const buttonClicked = document.querySelector("#input-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
};

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});


function render(leads) {
    let listItem = "";
    for (let i = 0; i < leads.length; i++) {
        listItem += `
        <li>
            <a href='${leads[i]}' target = '_blank'>
             ${leads[i]}
              </a>
        </li>`;
    };
    ulEl.innerHTML = listItem;
};

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});


buttonClicked.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});
