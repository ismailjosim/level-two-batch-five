{
	class PaymentEssentials {
		constructor(protected amount: number, public method: string) {}
	}

	class Bkash extends PaymentEssentials {}

	// ekhane amader ke ekta payment system banate hobe. tobe method method Bkash, nogod, rocket etc jekono ta hote pare. to amra amader proti ta payment class bananor jonno  PaymentEssentials class ta ke use korbo. etai holo abstraction. mane ekhane amra PaymentEssentials class ke directly call kortece na. tobe Bkash class ta PaymentEssentials ke extends kortece. jar fole PaymentEssentials behind the scene kaj kortece. amader ke instance create korar somoy directly etake call korar proyjon nei. eta abstract hisebe kaj korbe. tobe tar mane eta na je amra PaymentEssentials ke call korte parbo na instance hisebe. korte parbo tobe amader ke eta korte hobe na.
}
