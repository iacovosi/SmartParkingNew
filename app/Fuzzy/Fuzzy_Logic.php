<?php
namespace App\Fuzzy;
/***************************************************************
*  
*      (c) 2011 Wojtek Jarzęcki (lottocad(nospam)@gmail.com)
*      All rights reserved
*
*	   BSD Licence
* 
* Date: 2013-01-22
* Modified by: iJab(zhancaibaoATgmail.com)
*  Parse MatLab Rules of Fuzzy Logic
*
***************************************************************/
error_reporting(5);
define ("LINFINITY"	,	-1 );
define ("TRIANGLE" 	,	 0 );
define ("RINFINITY"	,	 1 );
define ("TRAPEZOID"	,	 2 );

class Fuzzy_Logic extends Rules {
				
	protected  $FuzzyTable 	=	NULL;
	public 	$StateOutput    =	array();
	protected	$AgregatePoints =   100;
/*
* Clear all solutions arrays in class and next calculations is Ready
* example :
*    $this->clearSolution();
* @param   none
* return   none 
*/			
	private function clearSolution() {
	$this->FXValues			=	array();
	$this->FYValues			=	array();
	}
	
/**
* Set protected properties FuzzyTable
* example :
*     $x->setFuzzyTable(array(
*     //      IF input1   AND input2 Then Output
*     //      For OR use pair input1 , NULL
*     //                      NULL   , input 2
*     //       ------       -------       -------         
*     	array('adequate',	   NULL  ,		'low'),
*     	array(NULL ,	     'small'  ,		'low'),
*     	array('marginal',	 'large' ,		'normal'),
*     	array('inadequate' , NULL ,	    'high'),
*     ));
* @param   array
* return   none 
**/	

	
	public function setFuzzyTable($A = array()) {
	$this->FuzzyTable = $A;
	}
		
/**
* Set Real Input Value @param2 for Input named @param1 
* example :
*    $fuzzy->setRealInput('input1',0.23);
* @param1   string $idx 
* @param2   float  $X
* return   none 
**/	

	public function setRealInput($idx,$X = 0.0) {
		$this->FRealInput[$idx]	=	$X;
		$this->FOutputs[$idx] = array();
		For ($i=0;$i<count($this->members[$idx]);$i++) {
			$this->FOutputs[$idx][]	=	$this->members[$idx][$i]->Fuzzification($this->FRealInput[$idx]); 
		}
	}
	
/**
* Set Input Range @param2 for Input named @param1 
* example :
*    $fuzzy->setInputRange('input1',array(0,1));
* @param1   string $idx 
* @param2   array  $range
* return   none 
**/	

	public function setInputRange($idx,$range = array(0, 1)) {
		$this->FInputRange[$idx]	=	$range;
	}

/*
* Agregate All Rules Result for Defuzification 
* example :
*    $fuzzy->fuzzyAgregate($outname,$Member,$AlphaCut=0.0)
* @param   string $output_name 
* @param   object $member_object
* @param   float $calculate_rule_value
* return   none 
*/	
	
	public function fuzzyAgregate($outname,$Member,$AlphaCut=0.0) {
		foreach($this->FXValues[$outname] as $index=>$pointX) {
			if ($pointX<$Member->FA) continue;
			if ($pointX>$Member->FB) break;
			$ms = $Member->Fuzzification($pointX);
			$mem_val = min($ms,$AlphaCut);
			$this->FYValues[$outname][$index] = max($this->FYValues[$outname][$index],$mem_val);	
		}
	}

/*
* Calculate Defuzification Fuzzy Result for method AVG (required set FuzzyTable)
* example :
*    $fuzzy->calcFuzzy()
* @param   none 
* return   array of outputs values (no associated keys)
*/		
	
	public function calcFuzzyAlt() {	
		$MaxAverage = 0;
		$this->clearSolution();
		//$count_inputs = count($this->InputNames);
		$sum = 0;
		$tmpx=array();
		$sum = array();
		$cnt = array();
		// fill output agregate table
		foreach($this->getOutputNames() as $outname) {
		$AgregateDeltaX = ($this->FMax[$outname]-$this->FMin[$outname])/$this->AgregatePoints;	 
		$this->FXValues[$outname] = Range($this->FMin[$outname],$this->FMax[$outname],$AgregateDeltaX);
		$this->FYValues[$outname] = array_fill ( 0 , count($this->FXValues[$outname]), 0.0 );
		}
		
		foreach ($this->FuzzyTable as $row_idx => $line_rule) {
				$sum = 0.0;
				$cnt = 0.0;
				$count_inputs = count($line_rule)-1; // last is output
				foreach ($line_rule as $col => $member_name) {
				$out_idx =$col - $count_inputs;
				$outname = $this->getOutputName($out_idx);
					if (!is_null($member_name)) {
					
						if ($col<$count_inputs) { // is input
							$inp_name = $this->getInputName($col);
							$mem_idx = $this->getMembersIndex($inp_name,$member_name);
							$val =$this->FOutputs[$inp_name][$mem_idx]; // get members value
							if ($val>0) { 
								$sum+=$val; // sum members values
								$cnt++;	
								} else {
								//$sum=0;
								//$cnt=0;
								break;
								}
						} else { //is output
	
								$member=$this->getMemberByName($outname,$member_name); // get OUTPUT member
								if ($cnt == 0) $avg_sum = 0; else $avg_sum = $sum/$cnt;
								$this->StateOutput[$member_name] = $avg_sum;
								if ($avg_sum>0)  $this->fuzzyAgregate($outname,$member,$avg_sum);
								$sum = 0.0;
								$cnt = 0.0;
						}
					} // if $member_name
				} // foreach rule	
			} // foreach rule_row
	
		$result = array();
		
		foreach($this->getOutputNames() as $outname) {
		$suma=0.0;
		$sumb=0.0;
		
		foreach($this->FXValues[$outname] as $id=>$x) {
			$y=$this->FYValues[$outname][$id];
			if ($y>0) {
			$suma+=($x*$y);
			$sumb+=$y;
			}
		}	
		if ($sumb == 0) $result[]= 0; else	$result[] = $suma/$sumb;	
		}
	return $result;
}
	
/*
* Calculate Defuzification Fuzzy Result for method MIN,MAX (required set Rules)
* example :
*    $fuzzy->calcFuzzyAlt()
* @param   none 
* return   array of outputs values (associated keys)
*/		
	
	public function calcFuzzy() {	
		$this->clearSolution();
				
		$sum = 0;
		$tmpx=array();
		$sum = array();
		$cnt = array();
		// fill output agregate table
		foreach($this->getOutputNames() as $outname) {
		$AgregateDeltaX = ($this->FMax[$outname]-$this->FMin[$outname])/$this->AgregatePoints;	 
		$this->FXValues[$outname] = Range($this->FMin[$outname],$this->FMax[$outname],$AgregateDeltaX);
		$this->FYValues[$outname] = array_fill ( 0 , count($this->FXValues[$outname]), 0.0 );
		}
		
		$rules=$this->getRules();
		foreach ($rules as $key=>$rule) {
			 list($outItem,$value) = $this->processRule($rule);
			 list($outputName,$memberName) = preg_split("/\./",$outItem);
			 $this->StateOutput[$memberName] = $value;
			 $member=$this->getMemberByName($outputName,$memberName); // get OUTPUT member
			 if ($value>0)  $this->fuzzyAgregate($outputName,$member,$value);
			}
	
		$result = array();
		
		foreach($this->getOutputNames() as $outname) {
		$suma=0.0;
		$sumb=0.0;
		
		foreach($this->FXValues[$outname] as $id=>$x) {
			$y=$this->FYValues[$outname][$id];
			if ($y>0) {
			$suma+=($x*$y);
			$sumb+=$y;
			}
		}	
		if ($sumb == 0) $result[$outname]= 0; else	$result[$outname] = $suma/$sumb;	
		}
	return $result;
}

} //class

?>