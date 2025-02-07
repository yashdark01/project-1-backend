const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
const courses = [
    {
        courseID: 1,
        title: 'Introduction to Programming',
        term: 'Fall 2023',
        description: 'Learn the basics of programming with Python.',
        credits: 3
    },
    {
        courseID: 2,
        title: 'Advanced JavaScript',
        term: 'Spring 2024',
        description: 'Deep dive into JavaScript and its frameworks.',
        credits: 4
    },
{
    courseID: 3,
    title: 'Data Structures and Algorithms',
    term: 'Summer 2024',
    description: 'Understand the core concepts of data structures and algorithms.',
    credits: 3
},
{
    courseID: 4,
    title: 'Machine Learning',
    term: 'Fall 2024',
    description: 'An introduction to machine learning concepts and techniques.',
    credits: 4
},
];

app.post('/api/courses', (req, res) => {
    const newCourse = req.body;
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.get('/api/courses', (req, res) => {
    res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.courseID === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
    res.json(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.courseID === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');

    const { title, description, credits, term } = req.body;
    course.title = title;
    course.description = description;
    course.credits = credits;
    course.term = term;

    res.json(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const courseIndex = courses.findIndex(c => c.courseID === parseInt(req.params.id));
    if (courseIndex === -1) return res.status(404).send('Course not found');
    const deletedCourse = courses.splice(courseIndex, 1);
    res.json(deletedCourse);
});


app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});


