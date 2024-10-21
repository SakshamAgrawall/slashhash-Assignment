import connection from '../config/db.js';
import { promisify } from 'util';

// Promisify the connection query to use async/await
const query = promisify(connection.query).bind(connection);

export const create = async (req, res) => {
    const { BranchType, Circle, DeliveryStatus, District,Name,Pincode,State } = req.body;
    // Input validation
    if (!BranchType || !Circle || !DeliveryStatus || !District,!Name,!Pincode,!State) {
        return res.status(400).json({ error: "All fields (BranchType, Circle, DeliveryStatus, District,Name,Pincode,State) are required" });
    }
    const sql = "INSERT INTO pincode (BranchType, Circle, DeliveryStatus, District,Name,Pincode,State) VALUES (?, ?, ?, ?,?,?,?)";
    try {
        const result = await query(sql, [BranchType, Circle, DeliveryStatus, District,Name,Pincode,State]);
        res.status(201).json({ message: "Favorite saved successfully", favoriteId: result.insertId });
    } catch (err) {
        console.error("Error saving favorite:", err);
        res.status(500).json({ error: "An error occurred while saving the favorite" });
    }
};

export const get = async (req, res) => {
    const sql = "SELECT * FROM pincode";

    try {
        const results = await query(sql);
        if (results.length === 0) {
            return res.status(404).json({ message: "No favorites found" });
        }
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching favorites:", err);
        res.status(500).json({ error: "An error occurred while fetching favorites" });
    }
};
