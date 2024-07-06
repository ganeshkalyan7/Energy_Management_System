import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from "axios";
import Alerts from '../Alerts';

jest.mock("axios")
const dummyData=[
    {
        "id": 1058,
        "alerttimereceived": [
            "5/14/2024",
            " 2:54:16 PM"
        ],
        "alert": "Peak Demand Limt - Level 2 Breach",
        "limitvalue": 4292,
        "systemName": "Building Load",
        "severity": "High",
        "action": "Mail sent"
    },
    {
        "id": 1057,
        "alerttimereceived": [
            "5/14/2024",
            " 2:53:16 PM"
        ],
        "alert": "Peak Demand Limt - Level 2 Breach",
        "limitvalue": 4317,
        "systemName": "Building Load",
        "severity": "High",
        "action": "Mail sent"
    },
    {
        "id": 1056,
        "alerttimereceived": [
            "5/14/2024",
            " 2:52:31 PM"
        ],
        "alert": "Peak Demand Limt - Level 2 Breach",
        "limitvalue": 4260,
        "systemName": "Building Load",
        "severity": "High",
        "action": "Mail sent"
    },


]

describe("alertsTest",()=>{
    it("should get all alerts  data",async ()=>{
        axios.get.mockResolvedValue({data:dummyData});
        axios.post.mockResolvedValue({data:dummyData});
        render(<Alerts/>);
        const alerts=await waitFor(()=>screen.getAllByTestId("alerts"))
        expect(alerts).toHaveLength(3);
    })
})