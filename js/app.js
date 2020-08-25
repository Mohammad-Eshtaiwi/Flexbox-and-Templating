"use strict";
let selectKeywords = $(".keywords");
let selectSort = $("#sort");
let cloneUnicorns = [];
$.ajax("./data/page-1.json").then((data) => {
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
});

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
  }
  $("main").html("");
  allUnicorns.forEach((unicorn) => {
    unicorn.render();
  });
});
// people.sort((a, b) => {
//   if (a.role.toUpperCase() < b.role.toUpperCase()) return 1;
//   else if (a.role.toUpperCase() > b.role.toUpperCase()) return -1;
//   else return 0;
// });
