using System;
using System.Threading;

namespace DockerProcess
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Program Starting");
            for (var i = 0; i < 50; i++)
            {
                Console.WriteLine($"Program Iterating {i}");
                Thread.Sleep(1000);
            }
            Console.WriteLine("Program Ending");
        }
    }
}
