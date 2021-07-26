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
  
  class FuzzySmartParkingCalculation {
  
	  public function calculateWithParameters($arrayofParameters) {
		$Fuzzy=null;  
		if (isset($arrayofParameters) && is_array($arrayofParameters) && (count($arrayofParameters)==3)) { 
			/*----------------Fuzzy Parameters----*/
			$x = new Fuzzy_Logic();
			$x->clearMembers();
			/* ---------- set input members ---------*/
			$x->setInputNames(array('PARAMETER1','PARAMETER2', 'PARAMETER3'));
            $x->addMember($x->getInputName(0), 'LOW', 0, 10, 30, LINFINITY);
			$x->addMember($x->getInputName(0),'MEDIUM', 25, 50, 75  ,TRIANGLE);
            $x->addMember($x->getInputName(0), 'HIGH', 70, 80, 100, RINFINITY);
            $x->addMember($x->getInputName(1), 'LOW', 0, 10, 30, LINFINITY);
			$x->addMember($x->getInputName(1),'MEDIUM', 25, 50, 75  ,TRIANGLE);
			$x->addMember($x->getInputName(1),'HIGH', 60  ,80 ,100    ,RINFINITY);
            $x->addMember($x->getInputName(2), 'LOW', 0, 10, 30, LINFINITY);
			$x->addMember($x->getInputName(2),'MEDIUM', 25, 50, 75  ,TRIANGLE);
            $x->addMember($x->getInputName(2), 'HIGH', 70, 80, 100, RINFINITY);
			
			/* ---------- set output members ---------*/
			$x->setOutputNames(array('ACTION'));
			$x->addMember($x->getOutputName(0),'VERY_BAD',0, 10 ,20 ,LINFINITY);
			$x->addMember($x->getOutputName(0),'BAD',15, 30 ,45 ,TRIANGLE);	
			$x->addMember($x->getOutputName(0),'GOOD',35, 50 ,65 ,TRIANGLE);	    
			$x->addMember($x->getOutputName(0),'VERY_GOOD',60, 80 ,85 ,TRIANGLE);
			$x->addMember($x->getOutputName(0),'EXCELLENT',75, 90 ,100 ,RINFINITY);
		  
		 
			/* ---------- set rule table ------------ */
			$x->clearRules();
			$x->addRule('IF PARAMETER1.LOW AND PARAMETER2.LOW AND PARAMETER3.LOW THEN ACTION.EXCELLENT');
			$x->addRule('IF PARAMETER1.LOW AND PARAMETER2.LOW AND PARAMETER3.MEDIUM THEN ACTION.EXCELLENT');
			$x->addRule('IF PARAMETER1.LOW AND PARAMETER2.LOW AND PARAMETER3.HIGH THEN ACTION.VERY_GOOD');
			$x->addRule('IF PARAMETER1.LOW AND PARAMETER2.MEDIUM AND PARAMETER3.LOW THEN ACTION.VERY_GOOD');
			$x->addRule('IF PARAMETER1.LOW AND PARAMETER2.MEDIUM AND PARAMETER3.MEDIUM THEN ACTION.VERY_GOOD');
			$x->addRule('IF PARAMETER1.LOW AND PARAMETER2.MEDIUM AND PARAMETER3.HIGH THEN ACTION.VERY_GOOD');
			$x->addRule('IF PARAMETER1.LOW AND PARAMETER2.HIGH AND PARAMETER3.LOW THEN ACTION.VERY_GOOD');
			$x->addRule('IF PARAMETER1.LOW AND PARAMETER2.HIGH AND PARAMETER3.MEDIUM THEN ACTION.VERY_GOOD');
			$x->addRule('IF PARAMETER1.LOW AND PARAMETER2.HIGH AND PARAMETER3.HIGH THEN ACTION.GOOD');
			$x->addRule('IF PARAMETER1.MEDIUM AND PARAMETER2.LOW AND PARAMETER3.LOW THEN ACTION.GOOD');
			$x->addRule('IF PARAMETER1.MEDIUM AND PARAMETER2.LOW AND PARAMETER3.MEDIUM THEN ACTION.GOOD');
			$x->addRule('IF PARAMETER1.MEDIUM AND PARAMETER2.LOW AND PARAMETER3.HIGH THEN ACTION.GOOD');
			$x->addRule('IF PARAMETER1.MEDIUM AND PARAMETER2.MEDIUM AND PARAMETER3.LOW THEN ACTION.GOOD');
			$x->addRule('IF PARAMETER1.MEDIUM AND PARAMETER2.MEDIUM AND PARAMETER3.MEDIUM THEN ACTION.BAD');
			$x->addRule('IF PARAMETER1.MEDIUM AND PARAMETER2.MEDIUM AND PARAMETER3.HIGH THEN ACTION.BAD');
			$x->addRule('IF PARAMETER1.MEDIUM AND PARAMETER2.HIGH AND PARAMETER3.LOW THEN ACTION.BAD');
			$x->addRule('IF PARAMETER1.MEDIUM AND PARAMETER2.HIGH AND PARAMETER3.MEDIUM THEN ACTION.BAD');
			$x->addRule('IF PARAMETER1.MEDIUM AND PARAMETER2.HIGH AND PARAMETER3.HIGH THEN ACTION.BAD');
			$x->addRule('IF PARAMETER1.HIGH AND PARAMETER2.LOW AND PARAMETER3.LOW THEN ACTION.BAD');
			$x->addRule('IF PARAMETER1.HIGH AND PARAMETER2.LOW AND PARAMETER3.MEDIUM THEN ACTION.BAD');
			$x->addRule('IF PARAMETER1.HIGH AND PARAMETER2.LOW AND PARAMETER3.HIGH THEN ACTION.BAD');
			$x->addRule('IF PARAMETER1.HIGH AND PARAMETER2.MEDIUM AND PARAMETER3.LOW THEN ACTION.BAD');
			$x->addRule('IF PARAMETER1.HIGH AND PARAMETER2.MEDIUM AND PARAMETER3.MEDIUM THEN ACTION.VERY_BAD');
			$x->addRule('IF PARAMETER1.HIGH AND PARAMETER2.MEDIUM AND PARAMETER3.HIGH THEN ACTION.VERY_BAD');				  				  
			$x->addRule('IF PARAMETER1.HIGH AND PARAMETER2.HIGH AND PARAMETER3.LOW THEN ACTION.VERY_BAD');
			$x->addRule('IF PARAMETER1.HIGH AND PARAMETER2.HIGH AND PARAMETER3.MEDIUM THEN ACTION.VERY_BAD');
			$x->addRule('IF PARAMETER1.HIGH AND PARAMETER2.HIGH AND PARAMETER3.HIGH THEN ACTION.VERY_BAD');
		 
			/*---------- Get values from database and calculate output ----*/
			$x->SetRealInput('PARAMETER1',$arrayofParameters['PARAMETER1']);
			$x->SetRealInput('PARAMETER2',$arrayofParameters['PARAMETER2']);
			$x->SetRealInput('PARAMETER3',$arrayofParameters['PARAMETER3']);
			$fuzzy_arr = $x->calcFuzzy();
			$Fuzzy = $fuzzy_arr['ACTION'];
			//$Fuzzy = $fuzzy_arr;
		}
		return $Fuzzy;
	  }


	  
  
  }