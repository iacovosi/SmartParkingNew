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

	
class Fuzzify extends Member {
	
	protected  $FMin	=	array();
	protected  $FMax	=	array();
	protected $members = array();
	
	public function setMinMax($idx,$A=0,$B=0) {
		If ($A<=$B) { 
		$this->FMin[$idx] 	=	$A;
		$this->FMax[$idx] 	= 	$B;
		} else {
			$this->FMin[$idx]   = 	$B;
			$this->FMax[$idx]	=	$A;
		}
	}
	
	public function clearMembers() {
		$this->members = NULL;
	}
	
	public function addMember($idx,$Name='New',$start=0.0,$medium=0.0,$stop=0.0,$type=TRIANGLE) {		
		$member = new Member($Name,$start,$medium,$stop,$type);
		if ($member->FA < (float)$this->FMin[$idx]) $this->setMinMax($idx, $member->FA ,(float)$this->FMax[$idx]);
		if ($member->FB > (float)$this->FMax[$idx]) $this->setMinMax($idx , (float)$this->FMin[$idx] , $member->FB);
		$this->members[$idx][] = $member;
	}
	
	public function setMembers($idx,$m = array()) {
		$this->members[$idx] = $m;
	}
	
	public function getMembers($idx,$id = NULL) {
		if(!is_null($id))
		{
			return $this->members[$idx][$id];
		}
		else if(!is_null($idx))
		{
			return $this->members[$idx]; 
		}
		else
		{
			return $this->members;
		}
	}
	
	public function getMembersIndex($idx,$value = NULL) {
		foreach ($this->members[$idx] as $idx => $member)	
			if ($value==$member->FName) return $idx;
		return FALSE;
	}
	
	public function getMemberByName($idx,$name = NULL) {
		foreach ($this->members[$idx] as $idx => $member)	
			if ($name==$member->FName) return $member;
		return FALSE;
	}
	
	} // end class fuzzify
