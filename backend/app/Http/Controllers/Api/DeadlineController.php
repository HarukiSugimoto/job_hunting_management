<?php

namespace App\Http\Controllers\Api;

use App\Models\Deadline;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DeadlineController extends Controller
{
    /**
     * Deadline
     * 
     * ESやテストの締め切りを管理
     */
    public function index()
    {
        $deadlines = Deadline::all();
        return response()->json($deadlines);
    }

    public function store(Request $request)
    {
        $deadline = Deadline::create($request->all());
        return response()->json($deadline, 201);
    }
}
