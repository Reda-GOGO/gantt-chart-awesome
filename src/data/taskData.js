export const taskData = [
    {
        id: 1,
        task_name: 'Construction plans',
        start: '2024-05-01' ,
        duration: 208 ,
        duration_hour: 4992 ,
        Predecessors: -1,
        parent :  0,
    },
    {
        id: 2,
        task_name: "Johnson's house",
        start: '2024-05-01',
        duration: 160,
        duration_hour: 3840,
        Predecessors: -1,
        parent :  1,
    },
    {
        id: 3,
        task_name: 'Contract ',
        start: '2024-05-01',
        duration: 32,
        duration_hour: 768,
        Predecessors: -1,
        parent :  2,
    },
    {
        id: 4,
        task_name: 'Supply construction agreement',
        start: '2024-05-01',
        duration: 17,
        duration_hour: 408,
        Predecessors: -1,
        parent :  3,
    },
    {
        id: 5,
        task_name: 'Estimation construction costs',
        start: '2024-05-16',
        duration: 11,
        duration_hour: 264,
        Predecessors: -1,
        parent :  3,
    },
    {
        id: 6,
        task_name: 'Sign contract',
        start: '2024-05-29',
        duration: 4,
        duration_hour: 96,
        Predecessors: -1,
        parent :  3,
    },
    {
        id: 7,
        task_name: 'Design',
        start: '2024-05-30',
        duration: 32,
        duration_hour: 768,
        Predecessors: -1,
        parent :  2,
    },
    {
        id: 8,
        task_name: 'Outline design',
        start: '2024-05-30',
        duration: 16,
        duration_hour: 384,
        Predecessors: -1,
        parent :  7,
    },
    {
        id: 9,
        task_name: 'Scheme design',
        start: '2024-06-15',
        duration: 16,
        duration_hour: 384,
        Predecessors: -1,
        parent :  7,
    },
    {
        id: 10,
        task_name: 'Obtain permits',
        start: '2024-06-30',
        duration: 10,
        duration_hour: 240,
        Predecessors: -1,
        parent :  2,
    },
    {
        id: 11,
        task_name: 'Secure financing',
        start: '2024-07-18',
        duration: 5,
        duration_hour: 120,
        Predecessors: -1,
        parent :  2,
    },
    {
        id: 12,
        task_name: 'Site works',
        start: '2024-07-11',
        duration: 20,
        duration_hour: 480,
        Predecessors: -1,
        parent :  2,
    },
    {
        id: 13,
        task_name: 'Foundation',
        start: '2024-07-31',
        duration: 26,
        duration_hour: 624,
        Predecessors: -1,
        parent :  2,
    },
    {
        id: 14,
        task_name: 'Roof',
        start: '2024-08-26',
        duration: 13,
        duration_hour: 312,
        Predecessors: -1,
        parent :  2,
    },
    {
        id: 15,
        task_name: 'Inspection',
        start: '2024-09-08',
        duration: 30,
        duration_hour: 720,
        Predecessors: -1,
        parent :  2,
    },
    {
        id: 16,
        task_name: 'Move in',
        start: '2024-10-08',
        duration: 0,
        duration_hour: 0,
        Predecessors: -1,
        parent :  2,
    },
    {
        id: 17,
        task_name: "Joplin's House",
        start: '2024-10-08',
        duration: 48,
        duration_hour: 1152,
        Predecessors: -1,
        parent :  1,
    },
    {
        id: 18,
        task_name: 'Tender',
        start: '2024-10-08',
        duration:22,
        duration_hour: 528,
        Predecessors: -1,
        parent :  17,
    },
    {
        id: 19,
        task_name: 'Issue tender documentation',
        start: '2024-10-08',
        duration: 11,
        duration_hour: 264,
        Predecessors: -1,
        parent :  18,
    },
    {
        id: 20,
        task_name: 'Tender interviews',
        start: '2024-10-20',
        duration: 10,
        duration_hour: 240,
        Predecessors: -1,
        parent :  18,
    },
    {
        id: 21,
        task_name: 'Contract',
        start: '2024-10-31',
        duration: 25,
        duration_hour: 600,
        Predecessors: -1,
        parent :  17,
    },

]

// relation = {
//     0 : [1]
//     1 : [2,3,5],
//     2 : [],
//     3 : [4],
//     4 : [],
//     5 : []
// }



