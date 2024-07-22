export function calculateParentDates(data) {
    // Helper function to parse date strings into Date objects
    function parseDate(dateStr) {
      return new Date(dateStr);
    }
  
    // Helper function to format Date objects back into date strings
    function formatDate(dateObj) {
      return dateObj.toISOString().replace('T', ' ').slice(0, 16);
    }
  
    // Helper function to find child tasks for a given parent ID
    function findChildren(parentId) {
      return data.filter(task => task.parent === parentId);
    }
  
    // Helper function to recursively calculate dates and durations
    function calculateTask(task) {
      const children = findChildren(task.id);
  
      if (children.length > 0) {
        children.forEach(child => calculateTask(child)); // Recursively calculate for child tasks
  
        // Sort children by start_date
        children.sort((a, b) => parseDate(a.start) - parseDate(b.start));
  
        // Set start_date for parent task as the start_date of the first child
        task.start = children[0].start;
  
        // Calculate end dates for each child and find the latest end date
        let maxEndDate = new Date(task.start);
        children.forEach(child => {
          const childEndDate = new Date(parseDate(child.start));
          childEndDate.setDate(childEndDate.getDate() + Math.floor(child.duration));
          childEndDate.setHours(childEndDate.getHours() + (child.duration % 1) * 24);
          if (childEndDate > maxEndDate) {
            maxEndDate = childEndDate;
          }
        });
  
        // Calculate duration for parent task as the difference between start and latest end date
        const startDate = parseDate(task.start);
        if(((maxEndDate - startDate) / (1000 * 60 * 60 * 24)) % 1 == 0 ){
            task.duration =Number(((maxEndDate - startDate) / (1000 * 60 * 60 * 24)));
        }else{
            task.duration = Number(((maxEndDate - startDate) / (1000 * 60 * 60 * 24)).toFixed(2));
        }
      }
    }
  
    // Find and calculate for top-level tasks (those without parents)
    const topLevelTasks = data.filter(task => task.parent === 0);
    topLevelTasks.forEach(task => calculateTask(task));
  
    return data;
  }
  