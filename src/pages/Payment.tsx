import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { updateUser } from '@/lib/auth';
import { PRICING_PLANS } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  CreditCard, ShieldCheck, Lock, ArrowLeft, Check,
  Sparkles, Gift, AlertCircle, RefreshCw
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Payment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();

  // Extract query parameters
  const planId = searchParams.get('plan') || 'pro';
  const isYearly = searchParams.get('yearly') === 'true';

  // Find selected plan
  const selectedPlan = PRICING_PLANS.find(p => p.id === planId) || PRICING_PLANS[1];

  // Price calculations
  const originalPrice = isYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoError, setPromoError] = useState('');

  // Checkout states
  const [processing, setProcessing] = useState(false);

  // Form states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [focusedField, setFocusedField] = useState('');

  useEffect(() => {
    document.title = 'Secure Payment | WebShark';
    if (loading) return;
    if (!user) {
      toast.error('Please login to subscribe to a plan');
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedVal = '';
    for (let i = 0; i < rawVal.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) formattedVal += ' ';
      formattedVal += rawVal[i];
    }
    setCardNumber(formattedVal);
  };

  // Format Expiry Date (adds '/' after 2 digits)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
    let formattedVal = '';
    for (let i = 0; i < rawVal.length && i < 4; i++) {
      if (i === 2) formattedVal += '/';
      formattedVal += rawVal[i];
    }
    setCardExpiry(formattedVal);
  };

  // Card Brand Detection
  const getCardBrand = (num: string) => {
    const cleanNum = num.replace(/\s+/g, '');
    if (cleanNum.startsWith('4')) return 'visa';
    if (cleanNum.startsWith('5')) return 'mastercard';
    if (cleanNum.startsWith('3')) return 'amex';
    return 'generic';
  };

  // Apply Coupon Code
  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      setPromoError('Please enter a promo code');
      return;
    }

    if (code === 'WEBSHARK50') {
      setDiscountPercent(50);
      setAppliedPromo(code);
      toast.success('50% Off Promo Code Applied!');
    } else if (code === 'FREE100') {
      setDiscountPercent(100);
      setAppliedPromo(code);
      toast.success('100% Free Trial Access Granted!');
    } else {
      setPromoError('Invalid promo code');
    }
    setPromoCode('');
  };

  const removePromo = () => {
    setDiscountPercent(0);
    setAppliedPromo('');
    toast.info('Promo code removed');
  };

  // Computations
  const subtotal = originalPrice;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalAmount = Math.max(0, subtotal - discountAmount);

  // Simulated Payment Handler
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardName.trim()) { toast.error('Please enter Cardholder Name'); return; }
    if (cardNumber.replace(/\s+/g, '').length < 16) { toast.error('Invalid Card Number'); return; }
    if (cardExpiry.length < 5) { toast.error('Invalid Expiry Date (MM/YY)'); return; }
    if (cardCVC.length < 3) { toast.error('Invalid CVC'); return; }

    setProcessing(true);
    toast.info('Securely communicating with payment gateways...');

    setTimeout(() => {
      setProcessing(false);

      // Save plan update in mock localstorage
      const stored = localStorage.getItem('webshark-user');
      if (stored) {
        try {
          const u = JSON.parse(stored);
          u.plan = planId === 'free' ? 'free' : 'pro';
          localStorage.setItem('webshark-user', JSON.stringify(u));
        } catch (e) {
          console.error(e);
        }
      }

      toast.success(`Subscription success! Welcome to WebShark ${selectedPlan.name}!`);
      navigate('/dashboard');
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-wide max-w-6xl">
          {/* Back link */}
          <button
            onClick={() => navigate('/pricing')}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 font-medium group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to plans
          </button>

          <div className="text-left mb-8">
            <h1 className="text-3xl font-black tracking-tight mb-2">Secure Checkout</h1>
            <p className="text-sm text-muted-foreground">Complete your billing information to activate your WebShark {selectedPlan.name} plan.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: PAYMENT FORM */}
            <div className="lg:col-span-7 space-y-6">
              {/* VISUAL CREDIT CARD MOCKUP */}
              <div className="relative h-48 w-full max-w-[380px] mx-auto rounded-2xl p-6 overflow-hidden text-white shadow-2xl transition-all duration-500 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border border-white/10 group">
                {/* Visual Glassmorphic shine */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/15 rounded-full blur-3xl group-hover:bg-accent/25 transition-all duration-500" />

                {/* Card Content Layout */}
                <div className="relative h-full flex flex-col justify-between z-10 font-mono">
                  {/* Top: Chip and Brand */}
                  <div className="flex justify-between items-start">
                    {/* Chip */}
                    <div className="w-10 h-7 bg-gradient-to-r from-amber-200 to-yellow-500 rounded-md border border-amber-300 flex items-center justify-center overflow-hidden opacity-90">
                      <div className="w-full h-full border border-black/10 grid grid-cols-3 grid-rows-3 opacity-30" />
                    </div>

                    {/* Logo detection */}
                    <div className="h-8 flex items-center">
                      {getCardBrand(cardNumber) === 'visa' && (
                        <span className="text-lg font-black italic tracking-wide text-blue-400">VISA</span>
                      )}
                      {getCardBrand(cardNumber) === 'mastercard' && (
                        <div className="flex items-center">
                          <div className="w-5 h-5 bg-red-500 rounded-full opacity-90 -mr-2" />
                          <div className="w-5 h-5 bg-amber-500 rounded-full opacity-90" />
                        </div>
                      )}
                      {getCardBrand(cardNumber) === 'amex' && (
                        <span className="text-xs font-bold bg-sky-500/25 border border-sky-400 px-2 py-0.5 rounded text-sky-300">AMEX</span>
                      )}
                      {getCardBrand(cardNumber) === 'generic' && (
                        <CreditCard className="w-5 h-5 text-muted-foreground opacity-60" />
                      )}
                    </div>
                  </div>

                  {/* Mid: Card Number */}
                  <div className="text-lg tracking-wider text-center py-2 font-bold drop-shadow-md">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>

                  {/* Bottom: Cardholder and Exp */}
                  <div className="flex justify-between items-end text-xs">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Card Holder</p>
                      <p className="font-semibold uppercase tracking-wide truncate max-w-[170px] drop-shadow-sm">
                        {cardName || 'Your Name'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-0.5 text-right">Expires</p>
                      <p className="font-semibold tracking-wide text-right drop-shadow-sm">
                        {cardExpiry || 'MM/YY'}
                      </p>
                    </div>
                    <div className="ml-4">
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-0.5 text-right">CVC</p>
                      <p className="font-semibold tracking-wide text-right drop-shadow-sm">
                        {cardCVC || '•••'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHECKOUT CARD FORM */}
              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="card-holder" className="text-xs font-bold text-muted-foreground">Cardholder Name</Label>
                    <Input
                      id="card-holder"
                      placeholder="Jane Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="h-10 text-sm focus-visible:ring-primary"
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="card-number" className="text-xs font-bold text-muted-foreground">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="card-number"
                        placeholder="4000 1234 5678 9010"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="h-10 text-sm pl-10 focus-visible:ring-primary"
                        onFocus={() => setFocusedField('number')}
                        onBlur={() => setFocusedField('')}
                      />
                      <CreditCard className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="card-expiry" className="text-xs font-bold text-muted-foreground">Expiry Date</Label>
                      <Input
                        id="card-expiry"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        className="h-10 text-sm focus-visible:ring-primary"
                        onFocus={() => setFocusedField('expiry')}
                        onBlur={() => setFocusedField('')}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="card-cvc" className="text-xs font-bold text-muted-foreground">CVC / CVV</Label>
                      <Input
                        id="card-cvc"
                        placeholder="123"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value.replace(/[^0-9]/gi, '').slice(0, 4))}
                        className="h-10 text-sm focus-visible:ring-primary"
                        onFocus={() => setFocusedField('cvc')}
                        onBlur={() => setFocusedField('')}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-brand hover:opacity-95 text-white h-11 font-bold gap-2 text-sm shadow-md"
                      disabled={processing || totalAmount === 0 && planId === 'free'}
                    >
                      {processing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Processing Transaction...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Pay & Activate Subscription (${totalAmount.toLocaleString()})
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:col-span-5 space-y-6">
              {/* SUMMARY BOX */}
              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-base border-b border-border pb-3">Order Summary</h3>

                {/* Selected Plan Details */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-primary">{selectedPlan.name} Plan</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 capitalize">{isYearly ? 'Billed Annually' : 'Billed Monthly'}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base">${originalPrice}</span>
                    <span className="text-[10px] text-muted-foreground">/{isYearly ? 'yr' : 'mo'}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="bg-muted/40 p-3.5 rounded-xl space-y-2 border border-border/50">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-primary animate-pulse" /> What's Included
                  </p>
                  {selectedPlan.features.slice(0, 4).map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                  {selectedPlan.features.length > 4 && (
                    <p className="text-[10px] text-muted-foreground font-semibold pl-5">+{selectedPlan.features.length - 4} more features included</p>
                  )}
                </div>

                {/* PROMO INPUT PANEL */}
                <div className="border-t border-border pt-4">
                  <form onSubmit={applyPromo} className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground block">Apply Promo Coupon</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g. WEBSHARK50"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="h-9 text-xs focus-visible:ring-primary flex-1"
                        disabled={!!appliedPromo}
                      />
                      <Button type="submit" size="sm" variant="secondary" className="h-9 text-xs" disabled={!!appliedPromo}>
                        Apply
                      </Button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {promoError}
                      </p>
                    )}
                    {appliedPromo && (
                      <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg text-xs mt-1 text-green-600 dark:text-green-500 font-medium">
                        <span className="flex items-center gap-1.5"><Gift className="w-3.5 h-3.5" /> Coupon: {appliedPromo} (-{discountPercent}%)</span>
                        <button type="button" onClick={removePromo} className="text-muted-foreground hover:text-foreground text-[10px] font-bold">Remove</button>
                      </div>
                    )}
                  </form>
                </div>

                {/* TOTAL BILL Breakdown */}
                <div className="border-t border-border pt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan Subtotal</span>
                    <span className="font-semibold">${subtotal}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-500 font-medium">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black border-t border-border/80 pt-3">
                    <span>Grand Total</span>
                    <span className="text-base font-extrabold text-primary">${totalAmount}</span>
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Secure 256-bit SSL encrypted checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
