const fetch = require('node-fetch');

const fetchWorkshopsPreviews = () =>
    fetch('http://31.31.199.170:8000/workshops', {method: 'GET'})
        .then(r => r.json())
        .then(r => r.data.workshops);

const fetchWorkshop = (workshopId) =>
    fetch(`http://31.31.199.170:8000/workshop/${workshopId}`, {method: 'GET'})
        .then(r => r.json())
        .then(r => r.data);

const clientifyImage = img =>
    `http://31.31.199.170/${img}`;

const clientifyTutor = tutor => ({
    ...tutor,
    image: clientifyImage(tutor.image),
});

const clientifyWorkshop = workshop => ({
    ...workshop,
    bannerImage: clientifyImage(workshop.bannerImage),
    tutors: workshop.tutors.map(clientifyTutor),
});

const getWorkshops = async () => {
    const workshopsPreviews = await fetchWorkshopsPreviews();
    const workshops = await Promise.all(workshopsPreviews.map(({id}) => fetchWorkshop(id)));

    return workshops.map(clientifyWorkshop);
};

// if (require.main === module) {
//     getWorkshops().then(console.log);
// }

module.exports = getWorkshops;
