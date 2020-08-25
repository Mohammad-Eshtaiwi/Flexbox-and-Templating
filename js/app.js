"use strict";
let select = $("select");

$.ajax("./data/page-1.json").then((data) => {
  data.forEach((item) => {
    let newObject = new Unicorn(
      item.image_url,
      item.description,
      item.keyword,
      item.horns,
      item.title
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
  // let template = $('#neighborhood-template').html(); // return a string
  // let html = Mustache.render(template,this); //(string,object)
  // $('#neighborhoods').append(html);
  console.log(this);
  let template = $("#unicorns-template").html();
  console.log(template);
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
    select.append(option);
  });
}

$(select).change(() => {
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
