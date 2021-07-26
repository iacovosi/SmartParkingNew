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

class Member {
	
	protected
		$FName,   // Member Name
		$FMiddle, // Middle Member point
		$FA,      // Start Member point
		$FB,	  // End member point
		$FType;	  // Member type TRIANGLE,LINFINITY,RFINFINITY, TRAPEZOID
				
	public function __construct($Name=NULL,$start=NULL,$medium=NULL,$stop=NULL,$type=NULL){
		if(is_null($Name)) return;
		$this->FName 	= $Name;
		$this->FMiddle 	= $medium;
		$this->FA 		= $start;
		$this->FB 		= $stop;
		$this->FType  	= $type;
	}

	public function __toString(){
		return "Member\tname: $this->FName, 
		middle: $this->FMiddle, 
		start : $this->FA,
		fb    : $this->FB,
		type  : $this->FType";
	}
	
/**
* Get Name of Membership funcitons.
*    $mf_name = getMemberName();
* @param   void
* return   string  
*/
	public function getMemberName() {
		return $this->FName;
	}
	
/**
* Get Type of Membership funcitons.
*    $mf_type = getMemberType();
* @param   void
* return   string  
*/
	public function getMemberType() {
		return $this->FType;
	}

/**
* Calculates the ratio of belonging to a set of defined function shape.
*    $ratio = Fuzzification($pontX);
* @param   float 	$poinX
* return   float  
*/
	public function Fuzzification($P=0.0) {
	
    if (($P<$this->FA) OR ($P>$this->FB)) return 0; //P is out this segment...

	if ($P==$this->FMiddle) return 1;

	 if ($this->FType==LINFINITY) {
	    if ($P<=$this->FMiddle) return 1;
		if (($P>$this->FMiddle) AND ($P<$this->FB)) return ($this->FB-$P)/($this->FB-$this->FMiddle);
	 }
	
	 if ($this->FType==RINFINITY) {
	    if ($P>=$this->FMiddle) return 1;
		if (($P<$this->FMiddle) AND ($P>$this->FA)) return ($P-$this->FA)/($this->FMiddle-$this->FA);
	 }

	if ($this->FType==TRIANGLE) {
	   if(($P<$this->FMiddle) AND ($P>$this->FA)) return ($P-$this->FA)/($this->FMiddle-$this->FA);
	   if(($P>$this->FMiddle) AND ($P<$this->FB))  return ($this->FB-$P)/($this->FB-$this->FMiddle);
	 }

	 if ($this->FType==TRAPEZOID) {
	   if(($P<$this->FMiddle[0]) AND ($P>$this->FA)) return ($P-$this->FA)/($this->FMiddle[0]-$this->FA);
	   if(($P>$this->FMiddle[1]) AND ($P<$this->FB))  return ($this->FB-$P)/($this->FB-$this->FMiddle[1]);
	   if (($P>=$this->FMiddle[0]) AND ($P<=$this->FMiddle[1]))  return 1;
	 }
	return 0;
}

} // class Member
