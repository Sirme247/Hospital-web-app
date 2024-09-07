const express = require('express');
const router = express.Router();
const Doctors = require('../models/doctors');
const Appointments = require('../models/appointments');

// My data for news articles
const articles = [
  { id: 1, title: 'My Blog 1', content: 'Full content of blog 1', img: 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=900&t=st=1687123388~exp=1687123988~hmac=f3410d0a5c2f20aec66c7d763c789bf0aae9c5026366fe41ae7d18e05e7e406b' },
  { id: 2, title: 'My Blog 2', content: 'Full content of blog 2', img: 'https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=900&t=st=1687123407~exp=1687124007~hmac=15a1b5a4d3a5af66dfba67bdcd577f769f813bf06fc8b5e50f32f6503099bbd8' },
  { id: 3, title: 'My Blog 3', content: 'Full content of blog 3', img: 'https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=900&t=st=1687123407~exp=1687124007~hmac=15a1b5a4d3a5af66dfba67bdcd577f769f813bf06fc8b5e50f32f6503099bbd8' },
  { id: 4, title: 'My Blog 4', content: 'Full content of blog 4', img: 'https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=900&t=st=1687123407~exp=1687124007~hmac=15a1b5a4d3a5af66dfba67bdcd577f769f813bf06fc8b5e50f32f6503099bbd8' },
  { id: 5, title: 'My Blog 5', content: 'Full content of blog 5', img: 'https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=900&t=st=1687123407~exp=1687124007~hmac=15a1b5a4d3a5af66dfba67bdcd577f769f813bf06fc8b5e50f32f6503099bbd8' },
  { id: 6, title: 'My Blog 6', content: 'Full content of blog 6', img: 'https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=900&t=st=1687123407~exp=1687124007~hmac=15a1b5a4d3a5af66dfba67bdcd577f769f813bf06fc8b5e50f32f6503099bbd8' },
  { id: 7, title: 'My Blog 7', content: 'Full content of blog 7', img: 'https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=900&t=st=1687123407~exp=1687124007~hmac=15a1b5a4d3a5af66dfba67bdcd577f769f813bf06fc8b5e50f32f6503099bbd8' },
  { id: 8, title: 'My Blog 8', content: 'Full content of blog 8', img: 'https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=900&t=st=1687123407~exp=1687124007~hmac=15a1b5a4d3a5af66dfba67bdcd577f769f813bf06fc8b5e50f32f6503099bbd8' },
  { id: 9, title: 'My Blog 9', content: 'Full content of blog 9', img: 'https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=900&t=st=1687123407~exp=1687124007~hmac=15a1b5a4d3a5af66dfba67bdcd577f769f813bf06fc8b5e50f32f6503099bbd8' },
 
  
];

/* Home Page */
router.get('/', (req, res) => {
    const locals = {
        title: "NodeJs school app",
        description: "Simple app"
    };
    res.render('index', { locals });
});

/* About Page */
router.get('/about', (req, res) => {
    res.render('about');
});

/* Accidents and emergency page*/
router.get('/emergency', (req, res) => {
    res.render('emergency');
});

/* Appointments page*/
router.get('/appointment', (req, res) => {
    res.render('appointment');
});

/* Visiting page*/
router.get('/visiting', (req, res) => {
    res.render('visiting');
});
/* Services page*/
router.get('/services', (req, res) => {
    res.render('services');
});

/*Appointment form submission */
router.post('/submit-appointment', async (req, res) => {
    try {
        const { patientName, patientAge, patientEmail, patientPhoneNumber, patientAppointmentDate, patientSpecialist, patientAdditionalInformation } = req.body;

        // Create a new appointment document
        const newAppointment = new Appointments({
            patientName,
            patientAge,
            patientEmail,
            patientPhoneNumber,
            patientAppointmentDate: new Date(patientAppointmentDate), // Convert the date string to a Date object
            patientSpecialist,
            patientAdditionalInformation
        });

        // Save the document to MongoDB
        await newAppointment.save();

        res.redirect('/appointment-confirmation');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

/*Appointment confirmation page */
router.get('/appointment-confirmation', (req, res) => {
    res.render('appointment-confirmation'); 
});

/*Branches Page */
router.get('/branches', (req, res) => {
    res.render('branches'); 
});

/*About us page */
router.get('/news', (req, res) => {
    res.render('news', { articles }); 
});

/* Article Page */
router.get('/article/:id', (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const article = articles.find(a => a.id === articleId);
    if (article) {
        res.render('article', { article });
    } else {
        res.status(404).send('Article not found');
    }
});

/* Staff Page */
router.get('/staff', async (req, res) => {
    try {
        let perPage = 12;
        let page = parseInt(req.query.page) || 1;
        let filterTitle = req.query.title || '';
        let searchTerm = req.query.searchTerm || '';

        // Build the query object
        let query = {};
        if (filterTitle) {
            query.title = filterTitle;
        }
        if (searchTerm) {
            const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
            query.doctorName = { $regex: new RegExp(searchNoSpecialChar, 'i') };
        }

        const data = await Doctors.find(query)
            .sort({ title: 1 }) // Sorting by title alphabetically
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();

        const count = await Doctors.countDocuments(query);
        const nextPage = page + 1;
        const prevPage = page - 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        const hasPrevPage = prevPage > 0;

        res.render('staff', {
            data,
            currentPage: page,
            nextPage: hasNextPage ? nextPage : null,
            prevPage: hasPrevPage ? prevPage : null,
            currentTitle: filterTitle,
            searchTerm // Pass the current search term to the template
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/search', async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let filterTitle = req.body.title || '';
        let page = parseInt(req.query.page) || 1;
        const perPage = 20;

        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

        let query = {
            $or: [
                { doctorName: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        };

        if (filterTitle) {
            query.title = filterTitle;
        }

        const data = await Doctors.find(query)
            .skip(perPage * (page - 1))
            .limit(perPage);

        const count = await Doctors.countDocuments(query);
        const nextPage = page + 1;
        const prevPage = page - 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        const hasPrevPage = prevPage > 0;

        res.render("search", {
            data,
            currentTitle: filterTitle,
            currentPage: page,
            nextPage: hasNextPage ? nextPage : null,
            prevPage: hasPrevPage ? prevPage : null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


// function insertAppointmentData () {
//     Appointments.insertMany([
//         {
//           patientName: "Sammy Focus Mwangi",
//           patientAge: "19",
//           patientEmail: "sasasasa@gmail.com",
//           patientPhoneNumber: "0725215497",
//           patientAppointmentDate:"2024-08-01T10:00:00Z",
//           patientSpecialist: "Racist",
//           patientAdditionalInformation:"No thank You"
//         },
//     ])
// };

// insertAppointmentData ();




/*

function insertPostData () {
    Doctors.insertMany([
        {
          doctorImage: "/img/profile.png",
          doctorName: "Mark Cucurella",
          title: "Gynaecologist",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
     
        },
        {
            doctorImage: "/img/profile.png",
            doctorName: "Enzo Fernandes",
            title: "Racist",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
     
        },
        {
            doctorImage: "/img/profile.png",
            doctorName: "Connor Gallagher",
            title: "Racist",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
     
        },
        {
            doctorImage: "/img/profile.png",
            doctorName: "Mason Greenwood",
            title: "Fighter",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
     
         },
        {
            doctorImage: "/img/profile.png",
            doctorName: "Cole Palmer",
            title: "Cold",
            body: "This is the body about the doctor"
        },
        {
            doctorImage: "/img/profile.png",
            doctorName: "Matheus Nunes",
            title: "Player",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
        },
        {
            doctorImage: "/img/profile.png",
            doctorName: "Kepa Arizabalaga",
            title: "Betrayer",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            doctorImage: "/img/profile.png",
            doctorName: "Robert Sanchez",
            title: "Mogger",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            doctorImage: "/img/profile.png",
            doctorName: "Andre Onana",
            title: "Keeper",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            doctorImage: "/img/profile.png",
            doctorName: "Bukayo Saka",
            title: "Starboy",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        }
    ])
}
insertPostData();

*/


module.exports = router;
