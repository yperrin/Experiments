var contentList = ['espweb', 'websites', 'crm', 'orders', 'email', 'tasks']

function openDetailPage(page) {
  switch(page){
    case 0:
      window.open('DetailPage.html','_self');
      break;
    case 1:
      window.open('ToDoDetailPage.html','_self');
      break;
    case 2: 
      window.open('OrdersDetailPage.html','_self');
      break;
    case 3:
      window.open('WebsitesDetailPage.html','_self');
      break;
    case 4:
      window.open('ESPDetailPage.html','_self');
      break;
  }
}

function backToDashboard() {
  window.open('dashboard.html', '_self');
}

function switchMode() {
  if(contentList[0] === 'espweb'){
    contentList = ['advEspweb', 'advWebsites', 'advCrm', 'advOrders', 'advEmail', 'advTasks'];
  } else {
    contentList = ['espweb', 'websites', 'crm', 'orders', 'email', 'tasks'];
  }
  
  var containerList = ['content1', 'content2', 'content3', 'content4', 'content5', 'content6'];
  for (var i = 0; i <= Math.min(contentList.length, containerList.length); i++) {
    $('#' + containerList[i]).html($('#' + contentList[i] + '-container').html());
  }
}