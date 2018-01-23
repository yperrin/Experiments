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