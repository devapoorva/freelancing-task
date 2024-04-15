<?php

namespace App\Http\Controllers;

use App\Dto\AppResponseDto;
use App\Models\AirDuct;
use App\Models\DryerVent;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    public function getQuote(Request $request){
        $airDuct = null;
        $dryerVent = null;
        if($request->get('no_of_furnace')){
            $airDuct = AirDuct::where('num_furnace',$request->get('no_of_furnace'))->first();
            if($airDuct){
                if($airDuct->num_furnace=="1"){
                    $airDuct->price = 495;
                }
                if($airDuct->num_furnace=="2"){
                    $airDuct->price = 795;
                }
            }
        }
        if($request->get('furnace_location')){
            $airDuct = AirDuct::where('furnace_loc_sidebyside',$request->get('furnace_location'))
                ->orWhere('furnace_loc_na',$request->get('furnace_location'))
                ->orWhere('furnace_loc_different',$request->get('furnace_location'))->first();
            if($airDuct){
                $airDuct->price = 445;
            }
        }
        if($request->get('square_footage')){
            $airDuct = AirDuct::where('square_footage_min','>=',$request->get('square_footage'))
                ->where('square_footage_max','<=',$request->get('square_footage'))->first();
            if($airDuct){
                $airDuct->price = 480;
            }
        }
        if($request->get('dryer_vent_exit_point')){
            $dryerVent = DryerVent::where('dryer_vent_exit_point',$request->get('dryer_vent_exit_point'))->first();
        }
        return response()->json(AppResponseDto::create(
            "quote data",
            true,
            array(
                'airDuct'=>$airDuct,
                'dryerVent'=>$dryerVent
            )
        ),200);
    }
}
