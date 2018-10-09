// Declarations

  // Queried Nodes
  var strategicPlans,
      strategicGoalsListItem,
      strategicPlansDetailedViewBack,
      strategicPlansDetailedView;

// Initialisation

  // Queried Nodes
  strategicPlans = $('#strategic-plans');
  strategicGoalsListItem = $('#strategic-goals-group li');
  strategicPlansDetailedViewBack = $('#strategic-plans-detailed-view img');
  strategicPlansDetailedView = $('#strategic-plans-detailed-view');

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


// Document Events
