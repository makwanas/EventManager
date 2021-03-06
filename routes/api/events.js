const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");

//Event Model
const Event = require('../../models/event');

//@route GET api/events
//@desc GET All Events
//@access Public

router.get('/', (req, res) => {
    Event.find()
        .sort({ date: -1 })
        .then(events => res.json(events))
});

//@route POST api/events
//@desc Create a Post
//@access Private

router.post('/', auth, (req, res) => {

    const { name, price, place, host_name, host_contactno, host_email, bio, people } = req.body;
    const newEvent = new Event({
        name,
        price,
        place,
        host_name,
        host_contactno,
        host_email,
        bio,
        people
    });

    //SIMPLE VALIDATION
    if (!name || !price || !place || !host_name || !host_contactno || !host_email || !bio || !people) {
        return res.status(400).json({ msg: 'Please enter all the fields mentioned down below:' });
    }

    newEvent.save().then(event => res.json(event));
});

//@route DELETE api/events/:id
//@desc Delete a event
//@access Private

router.delete('/:id', auth, (req, res) => {
    Event.findById(req.params.id)
        .then(event => event.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;
