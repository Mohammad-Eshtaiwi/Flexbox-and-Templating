"use strict";
let selectKeywords = $(".keywords");
let selectSort = $("#sort");
let cloneUnicorns = [];
function callAjax(path) {$.ajax(path).then((data) => {
  $('main').html('')
  allUnicorns = []
  data.forEach((item) => {
    let newObject = new Unicorn(
      item.image_url,
      item.description,
      item.keyword,
      item.horns,
      item.title,
      item.horns
    );
    allUnicorns.push(newObject);

    newObject.render();
  });

  filter(allUnicorns);
  $("main section").first().remove();
  cloneUnicorns = [...allUnicorns]
});
}
callAjax('./data/page-1.json')


var allUnicorns = [];

function Unicorn(image_url, description, keyword, horns, title) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}
Unicorn.prototype.render = function () {
  console.log(this.horns);

  let template = $("#unicorns-template").html();
  let html = Mustache.render(template, this); //(string,object)
  $("main").append(html);
};

function filter(mohamad) {
  let setUnique = new Set();
  mohamad.forEach((item) => {
    setUnique.add(item.keyword);
  });
  setUnique.forEach((item) => {
    let option = $(`<option value = ${item}>${item}</option>`);
    selectKeywords.append(option);
  });
}

$(selectKeywords).change(() => {
  $("section").removeClass("d-none");
  let val = $("select option:selected").attr("value");
  if (val !== "default") {
    let targetedElements = $(`section:not(section[data-keyword= ${val}])`).find(
      "section"
    );
    targetedElements = targetedElements.prevObject;
    targetedElements.addClass("d-none");
  }
});

selectSort.change((event) => {
  let target = $(event.target).val();
  console.log(target);
  if (target === "title") {
    allUnicorns.sort((a, b) => {
      if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
      else if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
      else return 0;
    });
  } else if (target === "number") {
    console.log("by number");
    allUnicorns.sort((a, b) => {
      if (a.horns > b.horns) {
        return 1;
      } else if (a.horns < b.horns) {
        return -1;
      } else {
        return 0;
      }
    });
  } else {
    $("main").html("");
    cloneUnicorns.forEach((unicorn) => {
      unicorn.render();
    });
    return;
  }
  console.log(" not returned");
  $("main").html("");
  allUnicorns.forEach((unicorn) => {
    unicorn.render();
  });
});
$('button').click(()=>{
  $('.keywords option:not(:first-of-type)').remove()
  console.log( $('.keywords'));
  callAjax(event.target.dataset.page)

console.log(event.target.dataset.page);
})