<?php

namespace App\Http\Controllers\Api;

use App\Models\Deadline;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\DeadlineRequest;
use App\Http\Resources\DeadlineResource;
use Illuminate\Container\Attributes\Auth;

class DeadlineController extends Controller
{
    /**
     * Deadline
     * 
     * ESやテストの締め切りを管理
     */
    public function index()
    {
        $deadlines = auth()->user()->deadlines();
        return DeadlineResource::collection($deadlines);
    }

    public function store(DeadlineRequest $request)
    {
        $deadline = Deadline::create($request->all());
        return DeadlineResource::make($deadline);
    }

    public function update(DeadlineRequest $request, Deadline $deadline)
    {
        $deadline->update($request->all());
        return DeadlineResource::make($deadline);
    }

    public function destroy(Deadline $deadline)
    {
        $deadline->delete();
        return response()->noContent();
    }

}
