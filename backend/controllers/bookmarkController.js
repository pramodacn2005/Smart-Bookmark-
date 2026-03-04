const Bookmark = require('../models/Bookmark');

// @desc    Get all bookmarks
// @route   GET /api/bookmarks
exports.getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: bookmarks.length,
            data: bookmarks
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Add a bookmark
// @route   POST /api/bookmarks
exports.addBookmark = async (req, res) => {
    try {
        const { title, url } = req.body;

        if (!title || !url) {
            return res.status(400).json({
                success: false,
                error: 'Please add a title and URL'
            });
        }

        const bookmark = await Bookmark.create(req.body);

        res.status(201).json({
            success: true,
            data: bookmark
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// @desc    Update a bookmark
// @route   PUT /api/bookmarks/:id
exports.updateBookmark = async (req, res) => {
    try {
        let bookmark = await Bookmark.findById(req.params.id);

        if (!bookmark) {
            return res.status(404).json({
                success: false,
                error: 'No bookmark found'
            });
        }

        bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: bookmark
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Delete a bookmark
// @route   DELETE /api/bookmarks/:id
exports.deleteBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id);

        if (!bookmark) {
            return res.status(404).json({
                success: false,
                error: 'No bookmark found'
            });
        }

        await Bookmark.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
