// find the first element with id="related", then change the id so it gets ignored bc that's the wrong one
// make the second element, the related videos sidebar, have display:none
function related1() {
  let related1Elem = document.getElementById('related')
  if (!related1Elem) {
    setTimeout(() => {
      related1();
    }, "100")
  } else {
    related1Elem.id = 'related1'
  }
  return related1Elem
}

function related2(related1Elem){
  let related2Elem = document.getElementById('related')
  console.log(related1Elem)
  console.log(related2Elem)
  if (!related2Elem) {
    setTimeout(() => {
      related2();
    }, "100")
  } else if (related1Elem === related2Elem) {
    setTimeout(() => {
      related2();
    }, "100")
  } else {
    related2Elem.style.display = "none"
  }
}

related2(related1())
