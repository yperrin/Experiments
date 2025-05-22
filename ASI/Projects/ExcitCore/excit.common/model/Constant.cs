using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.ServiceModel;

namespace asi.excit.common.Model
{
    public static class Constant
    {
        public static readonly IDictionary<string, string> OrderCreationStatus;
        public static readonly IDictionary<string, string> PromoStandardOrderStatusDescription;
        public static readonly IDictionary<string, string> OrderStatusID;
        public static readonly string SanmarOrderMessage = "SanmarOrderMessage";
        public static readonly int MaxThreadNumber = 10;
        public static readonly string DefaultCurrencyCode = "USD";

        static Constant()
        {
            PromoStandardOrderStatusDescription = new Dictionary<string, string>
            {
                [OrderStatus.Received] = "Order has been received",
                [OrderStatus.EntryHold] = "Vendor has a problem with the data in the purchase order, and it is preventing the order from being entered.",
                [OrderStatus.Confirmed] = "Order has been received, entered, and accepted",
                [OrderStatus.PreProduction] = "Vendor has begun to process the order, but it is not in production",
                [OrderStatus.GeneralHold] = "Something is preventing the order from being entered",
                [OrderStatus.CreditHold] = "Vendor is awaiting payment from customer",
                [OrderStatus.ProofHold] = "Vendor is awaiting response to proof",
                [OrderStatus.ArtHold] = "Vendor is awaiting suitable artwork from customer",
                [OrderStatus.BackOrderHold] = "Order has been backordered; Nothing has shipped yet.",
                [OrderStatus.InProduction] = "Production of the order has started.",
                [OrderStatus.InStorage] = "Order is complete, but vendor is waiting to ship goods",
                [OrderStatus.PartialShipment] = "Order has shipped in Part; remaining items in production",
                [OrderStatus.Complete] = "Order has shipped in full—No further updates will be given",
                [OrderStatus.Cancelled] = "Order has been cancelled—No further updates will be given",
                [OrderStatus.InvalidPONumber] = "Order not found for the given PO Number"
            };
            OrderCreationStatus = new Dictionary<string, string>
            {
                [OrderCreation.OrderSent] = "The Order has been sent to be processed",
                [OrderCreation.OrderCreated] = "The Order has been created"
            };
            OrderStatusID = new Dictionary<string, string>
            {
                ["Item10"] = OrderStatus.Received,
                ["Item11"] = OrderStatus.EntryHold,
                ["Item20"] = OrderStatus.Confirmed,
                ["Item30"] = OrderStatus.PreProduction,
                ["Item40"] = OrderStatus.GeneralHold,
                ["Item41"] = OrderStatus.CreditHold,
                ["Item42"] = OrderStatus.ProofHold,
                ["Item43"] = OrderStatus.ArtHold,
                ["Item44"] = OrderStatus.BackOrderHold,
                ["Item60"] = OrderStatus.InProduction,
                ["Item70"] = OrderStatus.InStorage,
                ["Item75"] = OrderStatus.PartialShipment,
                ["Item80"] = OrderStatus.Complete,
                ["Item99"] = OrderStatus.Cancelled
            };
        }

        #region Product Variant Code
        public enum ProductAttributeCode
        {
            PRCL,
            SIZE,
            MTRL,
            WHOS,
            IMCL
        }
        #endregion

        public enum PropertyType
        {
            TEXT,
            ETXT
        }

        /// <summary>
        /// Service Charge Type 
        /// </summary>
        public enum ServiceChargeType
        {
            /// <summary>
            /// Run Charge
            /// </summary>
            RNCH,
            /// <summary>
            /// Setup Charge
            /// </summary>
            STCH,
            /// <summary>
            /// PMS Charge
            /// </summary>
            PMCH,
            /// <summary>
            /// Reorder Charge
            /// </summary>
            RDCH,
            /// <summary>
            /// Product Color Charge
            /// </summary>
            PCCH,
            /// <summary>
            /// Speculative Sample Charge
            /// </summary>
            SMCH,
            /// <summary>
            /// Shipping Charge - Drop shipments
            /// </summary>
            SPCH,
            /// <summary>
            /// Product Option Charge
            /// </summary>
            PROP,
            /// <summary>
            /// Special Packaging
            /// </summary>
            QURE,
            /// <summary>
            /// Less than Minimum Charge
            /// </summary>
            LMCH,
            /// <summary>
            /// Rush Service Charge
            /// </summary>
            RHCH,
            /// <summary>
            /// Proof Charge
            /// </summary>
            PROF,
            /// <summary>
            /// Other Charge
            /// </summary>
            OTCH
        }
        /// <summary>
        /// Product Attribute Type 
        /// </summary>
        public enum ProductAttributeType
        {
            Color,
            Size,
            [Description("Imprint Method")]
            ImprintMethod
        }

        public static string GetEnumDescription(this Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());
            DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute),
                false);
            if (attributes != null &&
                attributes.Length > 0)
                return attributes[0].Description;
            else
                return value.ToString();
        }

        public static BasicHttpBinding getHttpBinding(string url)
        {
            var binding = new BasicHttpBinding
            {
                Security = !string.IsNullOrEmpty(url) && url.Contains("https")
                    ? new BasicHttpSecurity { Mode = BasicHttpSecurityMode.Transport }
                    : new BasicHttpSecurity { Mode = BasicHttpSecurityMode.None },
                MaxBufferSize = 2147483647,
                MaxReceivedMessageSize = 2147483647,
            };

            return binding;
        }
        public static string GetTwoLetterUSStateCode(string stateName)
        {
            if (!string.IsNullOrEmpty(stateName))
            {
                switch (stateName.Trim().ToLower())
                {
                    case "alabama": return "AL";
                    case "alaska": return "AK";
                    case "arizona": return "AZ";
                    case "arkansas": return "AR";
                    case "california": return "CA";
                    case "colorado": return "CO";
                    case "connecticut": return "CT";
                    case "delaware": return "DE";
                    case "district of columbia": return "DC";
                    case "florida": return "FL";
                    case "georgia": return "GA";
                    case "hawaii": return "HI";
                    case "idaho": return "ID";
                    case "illinois": return "IL";
                    case "indiana": return "IN";
                    case "iowa": return "IA";
                    case "kansas": return "KS";
                    case "kentucky": return "KY";
                    case "louisiana": return "LA";
                    case "maine": return "ME";
                    case "maryland": return "MD";
                    case "massachusetts": return "MA";
                    case "michigan": return "MI";
                    case "minnesota": return "MN";
                    case "mississippi": return "MS";
                    case "missouri": return "MO";
                    case "montana": return "MT";
                    case "nebraska": return "NE";
                    case "nevada": return "NV";
                    case "new hampshire": return "NH";
                    case "new jersey": return "NJ";
                    case "new mexico": return "NM";
                    case "new york": return "NY";
                    case "north carolina": return "NC";
                    case "north dakota": return "ND";
                    case "ohio": return "OH";
                    case "oklahoma": return "OK";
                    case "oregon": return "OR";
                    case "pennsylvania": return "PA";
                    case "rhode island": return "RI";
                    case "south carolina": return "SC";
                    case "south dakota": return "SD";
                    case "tennessee": return "TN";
                    case "texas": return "TX";
                    case "utah": return "UT";
                    case "vermont": return "VT";
                    case "virginia": return "VA";
                    case "washington": return "WA";
                    case "west virginia": return "WV";
                    case "wisconsin": return "WI";
                    case "wyoming": return "WY";
                    default: return stateName;
                }
            }
            else
            {
                return string.Empty;
            }
        }

        public static string GetTwoLetterCanadaStateCode(string stateName)
        {
            if (!string.IsNullOrEmpty(stateName))
            {
                switch (stateName.Trim().ToLower())
                {
                    case "alberta": return "AB";
                    case "british columbia": return "BC";
                    case "manitoba": return "MB";
                    case "new brunswick": return "NB";
                    case "newfoundland and labrador": return "NL";
                    case "nova scotia": return "NS";
                    case "northwest territories": return "NT";
                    case "nunavut": return "NU";
                    case "ontario": return "ON";
                    case "prince edward island": return "PE";
                    case "quebec": return "QC";
                    case "saskatchewan": return "SK";
                    case "yukon": return "YT";
                    default: return stateName;
                }
            }
            else
            {
                return string.Empty;
            }
        }

        public const string BestWay = "BEST";
        public const string CanadaPostInternationalParcel = "CPIP";
        public const string CanadaPostPriorityWorldwide = "CPPW";
        public const string CanadaPostRegularParcel = "CPRP";
        public const string CanadaPostXpresspost = "CPXP";
        public const string CustPickUp = "CUSTP";
        public const string DeliveryTruck = "DELIV";
        public const string FedexInternationalGround = "FDIG";
        public const string FedExInternationalPriority = "FDIP";
        public const string FedEx2Day = "FED2";
        public const string FedExGround = "FEDC";
        public const string FedralXpress = "FEDEX";
        public const string FedExPriorityOvernight = "FEDO";
        public const string LocalCarrier = "LOCAL";
        public const string Other = "OTHR";
        public const string Purolator = "PURO";
        public const string UPS2Day = "UPS2";
        public const string UPS2ndDayAir = "UPS2D";
        public const string UPS3Day = "UPS3";
        public const string UPS4Day = "UPS4";
        public const string UPSGround = "UPSC";
        public const string UPSGroundCommercial = "UPSGC";
        public const string UPSGroundResidential = "UPSGR";
        public const string UPSNextDayAir = "UPSN";
        public const string UPSOvernight = "UPSO";
        public const string UPSWorldwideExpress = "UPSW";
        public const string UPSWorldwideExpedited = "USPE";
        public const string USPSPriorityMail = "USPM";
        public const string USPSParcelPost = "USPP";
        public const string USPSFirstClassMail = "USPS";
        public const string PSST = "PSST";

        public struct OrderStatus
        {
            public const string Complete = "Complete";
            public const string PartialShipment = "Partial Shipment";
            public const string InProduction = "In Production";
            public const string Confirmed = "Order Confirmed";
            public const string Received = "Order Received";
            public const string EntryHold = "Order Entry Hold";
            public const string PreProduction = "Pre-Production";
            public const string GeneralHold = "General Hold";
            public const string CreditHold = "Credit Hold";
            public const string ProofHold = "Proof Hold";
            public const string ArtHold = "Art Hold";
            public const string BackOrderHold = "Back Order Hold";
            public const string InStorage = "In Storage";
            public const string Cancelled = "Canceled";
            public const string InvalidPONumber = "Invalid PO Number";
        }

        public struct OrderCreation
        {
            public const string OrderSent = "Order Sent";
            public const string OrderCreated = "Order Created";
            public const string TrialRequest = "Populated Trial Order";
            public const string SaveToLocal = "Saved order to local";
        }
    }
}