
(function toggleSidebar(){
    document.addEventListener('DOMContentLoaded', function () {
         const sidebarToggle = document.getElementById('sidebarToggle');
         const sidebar = document.getElementById('sidebar');
         const content = document.getElementById('content');
 
         sidebarToggle.addEventListener('click', function (e) {
           e.preventDefault();
           sidebar.classList.toggle('collapsed');
           content.classList.toggle('expanded');
         });
       });
 }
 )();