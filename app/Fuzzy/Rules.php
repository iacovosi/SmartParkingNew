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
	
class Rules extends Fuzzify{

	public	$FXValues 		= array();
	public	$FYValues 		= array();
	public	$FRealInput		=	array();
	public  $FInputRange	= array();
	public	$FOutputs		=	array();

	private $InputNames = NULL;
	private $OutputNames = NULL;
	private $rules = NULL;
	
/**
* Set private properties $this->InputNames
* example :
*    $fuzzy->setInputNames(array('Name1','Name2'));
* @param   array of string
* return   none  
**/
	
	public function setInputNames($val) {
		$this->InputNames = $val;
	}

/**
* Set private properties $this->OutputNames
* example :
*    $fuzzy->setOutputNames(array('Name1','Name2'));
* @param   array of string
* return   none  
**/
	
	public function setOutputNames($val) {
		$this->OutputNames = $val;
	}

/**
* Return private properties $this->InputNames
* example :
*    $names = $fuzzy->getInputNames();
* @param   none
* return   array of string  
**/
	
	public function getInputNames() {
		return $this->InputNames;
	}
	
/**
* Return private properties $this->OutputNames
* example :
*    $names = $fuzzy->getOututNames();
* @param   none
* return   array of string  
**/
	
	public function getOutputNames() {
		return $this->OutputNames;
	}

/**
* Return private properties $this->InputNames[$idx]
* example :
*    $names = $fuzzy->getInputNames($idx);
* @param   $idx Integer
* return   string  
**/
	
	public function getInputName($idx) {
		return $this->InputNames[$idx];
	}
	
/**
* Return private properties $this->OutputNames[$idx]
* example :
*    $names = $fuzzy->getOutputNames($idx);
* @param   none
* return   string  
**/
	
	public function getOutputName($idx=0) {
		return $this->OutputNames[$idx];
	}
	
/**
* Clear all rules
* example :
*    $fuzzy->clearRules();
* @param   none
* return   none  
**/
	
	public function clearRules() {
		$this->rules = NULL;
	}
	
/**
* Return array as Rules
* example :
*    $fuzzy->getRules();
* @param   none
* return   array of string  
**/
	
	public function getRules() {
		return $this->rules;
	}
	
/**
* Return Rule as String
* example :
*    $fuzzy->getRule($id);
* @param   integer $id (key)
* return   string  
**/
	
	public function getRule($id) {
		return $this->rules[$id];
	}

/**
* Add Rule as String to private properties Rules Array 
* example :
*    $fuzzy->addRule('IF input1.High AND input2.Slow Then Out1.Run');
* @param   string
* return   none  
**/
	
	public function addRule($val) {
		$this->rules[] = $val;
	}
	
/**
* Add Rules based on MatLab's Rule File 
* example :
*    $fuzzy->addRules(array("0 0 0 1 0 0 1, 1 (1) : 1",
												 "0 0 0 1 0 0 2, 1 (1) : 1",));
* @param   array
* return   none  
**/
	
	public function addRules($vals) {
		$ct_inputs = count($this->getInputNames());
		$ct_outputs = count($this->getOutputNames());
		
		foreach($vals as $val)
		{
			// Parse each rule with MatLab format
			$a_rule = explode(',', $val);
			$input_rule = explode(' ', $a_rule[0]);
			$r_rule = explode(':', $a_rule[1]);
			$output_rule = explode('(', $r_rule[0]);
			$tmp = explode(')', $output_rule[1]);
			$oput_put_rule[1] = $tmp[0];
			$op_rule = $r_rule[1];
			
			// Construct String Rule
			$rule_string = 'IF ';
			$op = intval($op_rule) == 1 ? "AND" : "OR";
			
			// Parse input params
			for($ix = 0; $ix < count($input_rule); $ix++)
			{
				$mf_ix = intval($input_rule[$ix])-1;
				if($mf_ix < 0 ) continue;				
				if($ix >= $ct_inputs ) break;
				
				$input_name = $this->getInputName($ix);				
				$input_mf = $this->getMembers($input_name, intval($input_rule[$ix])-1);				
				
				if($ix > 0)
				{
					$rule_string .= ' ' . $op . ' ';
				}				
				$rule_string .= $input_name . "." . $input_mf->getMemberName();
			}
			
			// Parse output params
			$rule_string .= ' Then ';
			$output_name = $this->getOutputName(intval($output_rule[1])-1);
			$output_mf = $this->getMembers($output_name, intval($output_rule[0])-1);
			$rule_string .= $output_name . "." . $output_mf->getMemberName();
			
			$this->rules[] = $rule_string;
		}
	}
	
/**
* Find parenthis fragments of Rule as string
* example :
*    $fragment = $this->rSplit('IF input1.High AND (input2.Slow OR input3.Fast) Then Out1.Run');
* @param   string
* return   string  'input2.Slow OR input3.Fast' 
**/
	
	private function rSplit($string) {
		if (preg_match("/\((([^()]*|(?R))*)\)/",$string,$matches))		
		return $matches[1];
	}
/**
* Get last nested parenthis fragments of Rule as string
* example :
*    $fragment = $this->getLastParent('IF input1.High AND (input2.Slow OR (input3.Fast AND input4.Warm)) Then Out1.Run');
* @param   string
* return   string  'input3.Fast AND input4.Warm' 
**/	
	private function getLastParent($a) {
	do {
	$a = $this->rSplit($a);
	if ($a) $ret=$a;
	} while($a);
	return $ret;
	}

/**
* Fuzzy Logic OR operation on array of values
* example :
*    $val = $this->_FuzzyOR(array(1,0.5));
* @param   array float values
* return   float (max value) = 0.5 
**/
	
	private function _FuzzyOR($arr) {
		return (max($arr));
	}
	
/**
* Fuzzy Logic OR operation on array of values
* example :
*    $val = $this->rSplit(array(1,0.5));
* @param   array float values
* return   float (min value) = 1 
**/	
	private function _FuzzyAND($arr) {
		return (min($arr));
	} 

/**
* Fuzzy Logic NOT operation on array of values
* example :
*    $val = $this->rSplit(array(1,0.5));
* @param   array float values
* return   float (min value) = 1 
**/	
	private function _FuzzyNOT($arr) {
		return 1 - $arr[0];
	} 
	
/**
* Calculate Rule.Parser And Interpreter for Rule. 
* Rule has text line example:
*    IF input1.High AND input2.Slow Then Out1.Run
* Where
*      Operator  : IF
*      Argument Input 1 : input1.High
*                  where InputName     = input1
* 	    				DotSeparator  = .
* 	    				 MemberName   = Run
*      Operator  : AND   Operation for Arg1 , Arg 2 values
*      Argument Input 2 : input2.Slow
*                  where    InputName  = input2
* 	    			DotSeparator  = .
* 	    			   MemberName = Slow
*      Operator  : Then
*      Argument Output 1  : Out1.Run (InputName,DotSeparator,MemberName)
*
*
* example :
*    $val = $fuzzy->processRule('IF input1.High AND input2.Slow Then Out1.Run');
* @param   string Rule
* return   float (calculated fuzzy value as Rule cryteria)
**/	
	
	public function processRule($rule) {
		while ($in_parent = $this->getLastParent($rule)) {	
			$pos=strpos($rule,$in_parent);
			$len=strlen($in_parent);
			$tmparr=array();
			$items=preg_split("/\s+/",$in_parent);
			$operation='and';
			foreach($items as $item) {
				$inp=strtolower($item);
				if (($inp=='or') or ($inp=='and') or ($inp=='not')) $operation=$inp; 	else   {
					list($inputName,$memberName) = preg_split("/\./",$item);
					// get value from 
					$mem_idx = $this->getMembersIndex($inputName,$memberName);
					$tmparr[] =$this->FOutputs[$inputName][$mem_idx];
					}
			}
		$value1 = ($operation == 'or') ? $this->_FuzzyOR($tmparr) : 
				  ($operation == 'not') ? $this->_FuzzyNOT($tmparr) :$this->_FuzzyAND($tmparr);
		$rule=substr($rule,0,$pos-1).$value1.substr($rule,$pos+$len+1); 
		}
		
		$items=preg_split("/\s+/",$rule);
		$operation='and';
		$firstop = array_shift($items);
		$outitem = array_pop($items);
		$tmparr=array();
		foreach($items as $item) {
			$inp=strtolower($item);
			if (($inp=='or') or ($inp=='and') or ($inp=='not')) $operation=$inp; 
				elseif (($inp=='then') or ($inp=='for'))  continue;
					else {
						// split names
						list($inputName,$memberName) = preg_split("/\./",$item);
						// get value from FOutputs 
						$mem_idx = $this->getMembersIndex($inputName,$memberName);
						$tmparr[] =$this->FOutputs[$inputName][$mem_idx];
						}
		}
		$value1 = ($operation == 'or') ? $this->_FuzzyOR($tmparr) : 
				  ($operation == 'not') ? $this->_FuzzyNOT($tmparr) :$this->_FuzzyAND($tmparr);
				  
		return array($outitem,$value1);
	}
	
} //class Rules	
