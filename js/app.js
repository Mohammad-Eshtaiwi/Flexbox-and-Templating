"use strict";
let select = $("select");

$.ajax("./data/page-1.json").then((data) => {
  data.forEach((item) => {
    let newObject = new Unicorn(
      item.image_url,
      item.description,
      item.keyword,
      item.horns
    );
    allUnicorns.push(newObject);
    newObject.render();
  });

  filter(allUnicorns);
  $("main section").first().remove();
});

var allUnicorns = [];

function Unicorn(image_url, description, keyword, horns) {
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}
Unicorn.prototype.render = function () {
  let clonedSection = $(".rendering").clone();
  let h2 = clonedSection.find("h2").text(this.title);
  let img = clonedSection
    .find("img")
    .attr("src", this.image_url)
    .attr("alt", this.title);
  let p = clonedSection.find("p").text(this.description);
  clonedSection.attr("class", "rendered");
  clonedSection.attr("data-keyword", this.keyword);

  // clonedSection.data('keyword',item.keyword);

  $("main").append(clonedSection);
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
