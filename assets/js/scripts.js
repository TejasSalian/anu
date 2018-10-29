// Declarations

// Queried Nodes
var strategicPlans,
  strategicGoalsListItem,
  strategicPlansDetailedViewBack,
  strategicPlansDetailedView,
  initiativesList,
  initiativesMoreDetails,
  initiativesViewMore,
  closeAnuOrgDetailView;

// Initialisation

// Queried Nodes
strategicPlans = $('#strategic-plans');
strategicGoalsListItem = $('#strategic-goals-group li');
strategicPlansDetailedViewBack = $('#strategic-plans-detailed-view img');
strategicPlansDetailedView = $('#strategic-plans-detailed-view');
initiativesViewMore = $('.initiatives .link > a');
initiativesMoreDetails = $('.initiatives .details');
initiativesList = $('.initiativesList');
closeAnuOrgDetailView = $('#close-anu-org-detail-view');
diamonds = $('.axis .diamond');
popUpMoreInfoClose = $('#pop-up-more-info .close');

// Funstions

// Events
// Strategic Goals List item click Event aka View More
strategicGoalsListItem.on('click', function() {
  // strategic-plans hide
  strategicPlans.addClass('d-none');
  // Show Detail Panel
  strategicPlansDetailedView.removeClass('d-none');
});

// Close Detail View
strategicPlansDetailedViewBack.on('click', function() {
  // strategic-plans show
  strategicPlans.removeClass('d-none');
  // hide Detail Panel
  strategicPlansDetailedView.addClass('d-none');
});

// initiatives List item View More click Event
initiativesViewMore.on('click', function() {
  // initiatives list hide
  initiativesList.addClass('d-none');
  // initiatives view more animate
  initiativesMoreDetails.removeClass('d-none close-it').addClass('open-it playing');
  setTimeout(function() {
    initiativesMoreDetails.removeClass('playing');
    initiativesMoreDetails.removeClass('open-it').addClass('close-it');
  }, 300);
});

// initiatives Detail view close click Event
closeAnuOrgDetailView.on('click', function() {
  // initiatives list show
  initiativesList.removeClass('d-none');
  // initiatives view more animate
  initiativesMoreDetails.addClass('playing');
  setTimeout(function() {
    initiativesMoreDetails.removeClass('playing');
  }, 300);
});

diamonds.on('click', function() {
  let loc = getOffset(this);
  let popup = document.getElementById('pop-up-more-info');
  // flash data to container Here
  // flashPopUpData();
  popup.classList.remove('r-20');
  popup.style.display = 'block';
  if (loc.left + popup.clientWidth >= window.innerWidth) {
    popup.style.left = (loc.left - popup.clientWidth) + 50 + 'px';
    popup.classList.add('r-20');
  }else {
    popup.style.left = (loc.left - 25) + 'px';
  }
  popup.style.top = (loc.top - popup.clientHeight - 25) + 'px';
});

popUpMoreInfoClose.on('click', function() {
  let popup = document.getElementById('pop-up-more-info');
  popup.style.display = 'none';
  popup.classList.remove('r-20');
  // document.querySelector('#pop-up-more-info .content-body').innerHTML = '';
});

// functions
function buildDiamonds(event) {
  if (diamonds.length > 0) {
    $.each(diamonds, function(key, diamond) {
      diamond = $(diamond);
      let progress = diamond.attr('data-progress');
      diamond.attr('style', 'margin-left : calc(' + Number(progress) + '% - 12px)');
    })
  }
}

function getOffset(el) {
  let _x = 0;
  let _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return {
    top: _y,
    left: _x
  };
}

// Document OnLoad and Parse
document.addEventListener("DOMContentLoaded", function() {
  buildDiamonds();
});
